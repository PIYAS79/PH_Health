import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

const Get_All_Admin_Service = async(params:any) =>{
    console.log(params);
    const res = await prisma.admin.findMany({
        where:{
            name : {
                contains : params.search
            }
        }
    });
    console.log(res);
    return res;
}


export const Admin_Services = {
    Get_All_Admin_Service,
    
}