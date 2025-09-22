import { Prisma, PrismaClient, User_Status, type Admin } from "@prisma/client"
import calculate_pagination, { type Pagination_Options_Type } from "../../global/pagination.js";
import type { Admin_Query_Type } from "./admin.interface.js";

const prisma = new PrismaClient();



const Get_All_Admin_Service = async (params: Admin_Query_Type, pagination: Pagination_Options_Type) => {
    console.log({pagination});
    const { page, limit, skip } = calculate_pagination(pagination);
    const { search, ...filter_field } = params;
    const search_conditions: Prisma.AdminWhereInput[] = [];
    const searchable_fields = ['name', 'email'];
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
        is_deleted: false
    })

    const where_conditions: Prisma.AdminWhereInput = { AND: search_conditions }

    const total = await prisma.admin.count({
        where: where_conditions
    })
    const res = await prisma.admin.findMany({
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

const Get_Single_Admin_By_Id_Service = async (id: string): Promise<Admin | null> => {
    const res = await prisma.admin.findUnique({
        where: { id, is_deleted: false }
    })
    return res;
}

const Update_Admin_Data_Service = async (id: string, data: Partial<Admin>): Promise<Admin> => {
    await prisma.admin.findUniqueOrThrow({ where: { id } })
    const res = await prisma.admin.update({
        where: { id, is_deleted: false },
        data
    })
    return res;
}

const Delete_Admin_and_User_Service = async (id: string): Promise<Admin> => {
    await prisma.admin.findUniqueOrThrow({
        where: {
            id,
        }
    })
    const res = await prisma.$transaction(async (tc) => {
        const deleted_admin_data = await tc.admin.delete({
            where: { id }
        })
        await tc.user.delete({
            where: {
                email: deleted_admin_data.email
            }
        })
        return deleted_admin_data
    })
    return res;
}

const Soft_Delete_Admin_and_User_Service = async (id: string): Promise<Admin> => {
    await prisma.admin.findUniqueOrThrow({
        where: {
            id,
            is_deleted: false
        }
    })
    const res = await prisma.$transaction(async (tc) => {
        const deleted_admin_data = await tc.admin.update({
            where: { id },
            data: { is_deleted: true }
        })
        await tc.user.update({
            where: {
                email: deleted_admin_data.email
            },
            data: { user_status: User_Status.DELETED }
        })
        return deleted_admin_data
    })
    return res;
}

export const Admin_Services = {
    Get_All_Admin_Service,
    Get_Single_Admin_By_Id_Service,
    Update_Admin_Data_Service,
    Delete_Admin_and_User_Service,
    Soft_Delete_Admin_and_User_Service,

}   