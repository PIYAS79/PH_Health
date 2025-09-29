import type { Request } from "express";
import Upload_To_Cloudinary from "../../utils/cloudinary.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); 

const Create_Specialties_Service = async(req:Request)=>{
    if(req.file){
        const cloudinary_response = await Upload_To_Cloudinary(req.file);
        req.body.icon = cloudinary_response?.secure_url
    }
    const specialties_data = await prisma.specialties.create({
        data:req.body
    }) 
    return specialties_data;
}






export const Specialties_Services = {
    Create_Specialties_Service,
}

