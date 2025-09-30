import type { Request } from "express";
import Upload_To_Cloudinary from "../../utils/cloudinary.js";
import { PrismaClient } from "@prisma/client";
import httpStatus from 'http-status'
import Final_App_Error from "../../errors/Final_App_Error.js";

const prisma = new PrismaClient();

const Create_Specialties_Service = async (req: Request) => {
    if (req.file) {
        const cloudinary_response = await Upload_To_Cloudinary(req.file);
        req.body.icon = cloudinary_response?.secure_url
    }
    const specialties_data = await prisma.specialties.create({
        data: req.body
    })
    return specialties_data;
}

const Get_All_Specialties_Service = async () => {
    const specialties = await prisma.specialties.findMany()
    return specialties;
}

const Delete_Specialties_Service = async (req: Request) => {
    const {id} = req.params;
    if(!id){
        throw new Final_App_Error(httpStatus.FORBIDDEN,"no id found")
    }
    const deleted_specialties = await prisma.specialties.delete({
        where:{
            id
        }
    })
    return deleted_specialties;
}




export const Specialties_Services = {
    Create_Specialties_Service,
    Get_All_Specialties_Service,
    Delete_Specialties_Service,

}

