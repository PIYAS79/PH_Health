import { User_Role } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import Upload_To_Cloudinary from "../../utils/cloudinary.js";

const prisma = new PrismaClient();

const Create_User_Admin_Service = async(req:any)=>{

    if(req.file){
        console.log("inside");
        const uploaded_file = await Upload_To_Cloudinary(req.file);
        console.log({uploaded_file});
        req.body.admin.profile_photo=uploaded_file?.secure_url
    }
    const hashed_pass:string = await bcrypt.hash(req.body.password,12);
    const user_data = {
        email : req.body.admin.email,
        password : hashed_pass,
        role : User_Role.ADMIN
    }

    const res = await prisma.$transaction(async(tc)=>{
        const create_user = await tc.user.create({
            data : user_data
        })
        const create_admin = await tc.admin.create({
            data : req.body.admin
        })
        return {create_admin};
    })

    return res;
}


export const User_Services = {
    Create_User_Admin_Service,

}