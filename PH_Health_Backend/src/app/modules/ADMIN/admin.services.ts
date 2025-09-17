import { Prisma, PrismaClient } from "@prisma/client"
import calculate_pagination from "../../global/pagination.js";

const prisma = new PrismaClient();



const Get_All_Admin_Service = async (params: any,pagination:any) => {
    const {limit,skip}=calculate_pagination(pagination);
    const {search,...filter_field}=params;
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
    if(Object.keys(filter_field).length > 0){
        search_conditions.push({
            AND : Object.keys(filter_field).map((field)=>({
                [field] : {
                    equals : filter_field[field]
                }
            }))
        })
    }
    const where_conditions: Prisma.AdminWhereInput = { AND: search_conditions }

    const res = await prisma.admin.findMany({
        where: where_conditions,
        skip,
        take : limit,
        orderBy : pagination.sortBy && pagination.sortOrder ? {
            [pagination.sortBy] : pagination.sortOrder
        }:{
            createdAt : 'desc'
        }
    });
    return res;
}


export const Admin_Services = {
    Get_All_Admin_Service,

} 