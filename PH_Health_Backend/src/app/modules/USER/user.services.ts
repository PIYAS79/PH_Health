import { User_Role } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

const Create_User_Admin_Service = async(data:any)=>{
    
    const hashed_pass:string = await bcrypt.hash(data.password,12);
    const user_data = {
        email : data.admin.email,
        password : hashed_pass,
        role : User_Role.ADMIN
    }

    const res = await prisma.$transaction(async(tc)=>{
        const create_user = await tc.user.create({
            data : user_data
        })
        const create_admin = await tc.admin.create({
            data : data.admin
        })
        return {create_user,create_admin};
    })

    return res;
}


export const User_Services = {
    Create_User_Admin_Service,

}