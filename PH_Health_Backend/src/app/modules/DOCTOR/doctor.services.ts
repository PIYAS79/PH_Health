import { PrismaClient, User_Status, type Doctor, type Prisma } from "@prisma/client";
import calculate_pagination, { type Pagination_Options_Type } from "../../global/pagination.js";
import type { Doctor_Query_Type } from "./doctor.interface.js";
import Final_App_Error from "../../errors/Final_App_Error.js";

const prisma = new PrismaClient();

const Get_All_Doctor_Service = async (params: Doctor_Query_Type, pagination: Pagination_Options_Type) => {
    const { page, limit, skip } = calculate_pagination(pagination);
    const { search, ...filter_field } = params;
    const search_conditions: Prisma.DoctorWhereInput[] = [];
    const searchable_fields = ['name', 'email', 'current_working_place', 'designation'];
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
    console.dir(search_conditions, { depth: Infinity });
    if (Object.keys(filter_field).length > 0) {
        search_conditions.push({
            AND: Object.keys(filter_field).map((field) => ({
                [field]: {
                    equals: (filter_field as any)[field]
                }
            }))
        })
    }

    search_conditions.push({
        is_deleted: false
    })

    const where_conditions: Prisma.DoctorWhereInput = { AND: search_conditions }

    const total = await prisma.doctor.count({
        where: where_conditions
    })
    const res = await prisma.doctor.findMany({
        where: where_conditions,
        skip,
        take: limit,
        orderBy: pagination.sortBy && pagination.sortOrder ? {
            [pagination.sortBy]: pagination.sortOrder
        } : {
            createdAt: 'desc'
        },
        include: {
            doctorSpecialties: true
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

const Get_Single_Doctor_Service = async (id: string) => {
    const doctor_data = await prisma.doctor.findUniqueOrThrow({
        where: {
            id,
            is_deleted: false
        },
        include: {
            doctorSpecialties: true
        }
    })
    return doctor_data;
}

const Delete_Doctor_and_User_Service = async (id: string): Promise<Doctor> => {
    await prisma.doctor.findUniqueOrThrow({
        where: {
            id,
        }
    })
    const res = await prisma.$transaction(async (tc) => {
        const deleted_doctor_data = await tc.doctor.delete({
            where: { id }
        })
        await tc.user.delete({
            where: {
                email: deleted_doctor_data.email
            }
        })
        return deleted_doctor_data
    })
    return res;
}

const Soft_Delete_Doctor_and_User_Service = async (id: string): Promise<Doctor> => {
    await prisma.doctor.findUniqueOrThrow({
        where: {
            id,
            is_deleted: false
        }
    })
    const res = await prisma.$transaction(async (tc) => {
        const deleted_doctor_data = await tc.doctor.update({
            where: { id },
            data: { is_deleted: true }
        })
        await tc.user.update({
            where: {
                email: deleted_doctor_data.email
            },
            data: { user_status: User_Status.DELETED }
        })
        return deleted_doctor_data
    })
    return res;
}

const Update_Doctor_Service = async (id: string, payload: any) => {
    const { specialties, ...will_update_data } = payload;
    const doctor = await prisma.doctor.findUniqueOrThrow({ where: { id } })

    const res = await prisma.$transaction(async (tc) => {
        await tc.doctor.update({
            where: {
                id
            },
            data: will_update_data,
            include: {
                doctorSpecialties: true
            }
        })
        if (specialties && specialties.length > 0) {
            // for delete specialties
            const deleted_specialties = specialties.filter((one: any) => one.is_deleted);
            for (const one of deleted_specialties) {
                await tc.doctorSpecialties.deleteMany({
                    where: {
                        doctorId: doctor.id,
                        specialtiesId: one.specialties_id
                    }
                })
            }
            // for create specialties
            const create_specialties = specialties.filter((one: any) => !one.is_deleted);
            for (const one of create_specialties) {
                await tc.doctorSpecialties.create({
                    data: {
                        doctorId: doctor.id,
                        specialtiesId: one.specialties_id
                    }
                })
            }
            const final_updated_data = await tc.doctor.findUnique({
                where: {
                    id: doctor.id
                },
                include: {
                    doctorSpecialties: {
                        include: {
                            specialties: true
                        }
                    }
                }
            })
            return final_updated_data;
        }
    })
    return res;
}


export const Doctor_Services = {
    Get_All_Doctor_Service,
    Get_Single_Doctor_Service,
    Delete_Doctor_and_User_Service,
    Soft_Delete_Doctor_and_User_Service,
    Update_Doctor_Service
}