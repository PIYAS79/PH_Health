import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

const Get_All_Admin_Service = async() =>{
    const res = await prisma.admin.findMany();
    return res;
}


export const Admin_Services = {
    Get_All_Admin_Service,
    
}