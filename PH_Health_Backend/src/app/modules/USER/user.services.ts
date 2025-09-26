import { User_Role } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import Upload_To_Cloudinary from "../../utils/cloudinary.js";

const prisma = new PrismaClient();

const Create_User_Admin_Service = async (req: any) => {
    if (req.file) {
        const uploaded_file = await Upload_To_Cloudinary(req.file);
        req.body.admin.profile_photo = uploaded_file?.secure_url
    }
    const hashed_pass: string = await bcrypt.hash(req.body.password, 12);
    const user_data = {
        email: req.body.admin.email,
        password: hashed_pass,
        role: User_Role.ADMIN
    }
    const res = await prisma.$transaction(async (tc) => {
        await tc.user.create({
            data: user_data
        })
        const create_admin = await tc.admin.create({
            data: req.body.admin
        })
        return { create_admin };
    })
    return res;
}

const Create_User_Doctor_Service = async (req: any) => {
    if (req.file) {
        const uploaded_file = await Upload_To_Cloudinary(req.file);
        req.body.doctor.profile_photo = uploaded_file?.secure_url
    }
    const hashed_pass: string = await bcrypt.hash(req.body.password, 12);
    const user_data = {
        email: req.body.doctor.email,
        password: hashed_pass,
        role: User_Role.DOCTOR
    }
    const res = await prisma.$transaction(async (tc) => {
        await tc.user.create({
            data: user_data
        })
        const create_doctor = await tc.doctor.create({
            data: req.body.doctor
        })
        return { create_doctor };
    })
    return res;
}

const Create_User_Patient_Service = async (req: any) => {
    if (req.file) {
        const uploaded_file = await Upload_To_Cloudinary(req.file);
        req.body.patient.profile_photo = uploaded_file?.secure_url
    }
    const hashed_pass: string = await bcrypt.hash(req.body.password, 12);
    const user_data = {
        email: req.body.patient.email,
        password: hashed_pass,
        role: User_Role.PATIENT
    }
    const res = await prisma.$transaction(async (tc) => {
        await tc.user.create({
            data: user_data
        })
        const create_patient = await tc.patient.create({
            data: req.body.patient
        })
        return { create_patient };
    })
    return res;
}

export const User_Services = {
    Create_User_Admin_Service,
    Create_User_Doctor_Service,
    Create_User_Patient_Service,
}