import { Prisma, PrismaClient, type Patient } from "@prisma/client";
import type { Patient_Query_Type } from "./patient.interface.js";
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
    search_conditions.push({
        isDeleted: false
    })
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


export const Patient_Services = {
    Get_All_Patient_Service,
    Get_Single_Patient_Service,
}