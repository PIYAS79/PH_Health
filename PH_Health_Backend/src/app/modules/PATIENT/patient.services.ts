import { Prisma, PrismaClient, User_Status, type Patient } from "@prisma/client";
import type { IPatientUpdate, Patient_Query_Type } from "./patient.interface.js";
import type { Pagination_Options_Type } from "../../global/pagination.js";
import calculate_pagination from "../../global/pagination.js";

const prisma = new PrismaClient();


const Get_All_Patient_Service = async (params: Patient_Query_Type, pagination: Pagination_Options_Type) => {
    const { page, limit, skip } = calculate_pagination(pagination);
    const { search, ...filter_field } = params;
    const search_conditions: Prisma.PatientWhereInput[] = [];
    const searchable_fields = ['name', 'email', 'contact_number', 'address'];
    if (params.search) {
        search_conditions.push({
            OR: searchable_fields.map((field) => ({
                [field]: {
                    contains: params.search,
                    mode: "insensitive"
                }
            }))
        })
    }
    if (Object.keys(filter_field).length > 0) {
        search_conditions.push({
            AND: Object.keys(filter_field).map((field) => ({
                [field]: {
                    equals: (filter_field as any)[field]
                }
            }))
        })
    }
    const where_conditions: Prisma.PatientWhereInput = { AND: search_conditions }
    const total = await prisma.patient.count({
        where: where_conditions
    })
    const res = await prisma.patient.findMany({
        where: where_conditions,
        skip,
        take: limit,
        orderBy: pagination.sortBy && pagination.sortOrder ? {
            [pagination.sortBy]: pagination.sortOrder
        } : {
            createdAt: 'desc'
        },
        include: {
            user: true
        }
    });
    return {
        meta: {
            limit,
            page,
            total
        },
        data: res
    };
}

const Get_Single_Patient_Service = async (id: string): Promise<Patient | null> => {
    const res = await prisma.patient.findUniqueOrThrow({
        where: { id, isDeleted: false }
    })
    return res;
}

const Update_Patient_Service = async (id: string, payload: Partial<IPatientUpdate>): Promise<Patient | null> => {
    const { patientHealthData, medicalReport, ...will_update_data } = payload;
    const patient = await prisma.patient.findUniqueOrThrow({
        where: { id, isDeleted: false }
    })
    const result = await prisma.$transaction(async (tc) => {
        await tc.patient.update({
            where: {
                id
            },
            data: will_update_data
        })
        // create or update patient health data
        if (patientHealthData) {
            await tc.patientHealthData.upsert({
                where: {
                    patientId: patient.id
                },
                update: patientHealthData,
                create: { ...patientHealthData, patientId: patient.id }
            })
        }
        // create medical info 
        if (medicalReport) {
            await tc.medicalReport.create({
                data: { ...medicalReport, patientId: patient.id }
            })
        }
        const final_patient_data = await tc.patient.findUnique({
            where: {
                id: patient.id
            },
            include: {
                patientHealthData: true,
                medicalReport: true
            }
        })
        return final_patient_data
    })
    return result
}

const Delete_Patient_Service = async (id: string): Promise<Patient | null> => {
    const result = await prisma.$transaction(async (tc) => {
        await tc.patientHealthData.delete({
            where: {
                patientId: id
            }
        })
        await tc.medicalReport.deleteMany({
            where: {
                patientId: id
            }
        })
        const patient_data = await tc.patient.delete({
            where: { id }
        })
        await tc.user.delete({
            where: {
                email: patient_data.email
            }
        })
        return patient_data;
    })
    return result;
}

const Soft_Delete_Patient_Service = async (id: string): Promise<Patient | null> => {
    const result = await prisma.$transaction(async (tc) => {
        const deleted_patient = await tc.patient.update({
            where: {
                id
            },
            data: {
                isDeleted: true
            }
        })
        await tc.user.update({
            where: {
                email: deleted_patient.email
            },
            data: {
                user_status: User_Status.DELETED
            }
        })
        return deleted_patient;
    })
    return result;
}


export const Patient_Services = {
    Get_All_Patient_Service,
    Get_Single_Patient_Service,
    Update_Patient_Service,
    Delete_Patient_Service,
    Soft_Delete_Patient_Service
}