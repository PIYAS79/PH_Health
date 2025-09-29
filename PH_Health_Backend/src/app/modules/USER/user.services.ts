import { Prisma, User_Role, type Admin, type Doctor, type Patient } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import Upload_To_Cloudinary from "../../utils/cloudinary.js";
import type { Request } from "express";
import type { Pagination_Options_Type } from "../../global/pagination.js";
import type { User_Query_Type } from "./user.interface.js";
import calculate_pagination from "../../global/pagination.js";
import type { JwtPayload } from "jsonwebtoken";

const prisma = new PrismaClient();

const Create_User_Admin_Service = async (req: Request): Promise<Admin> => {
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
        return create_admin
    })
    return res;
}

const Create_User_Doctor_Service = async (req: Request): Promise<Doctor> => {
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
        return create_doctor;
    })
    return res;
}

const Create_User_Patient_Service = async (req: Request): Promise<Patient> => {
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
        return create_patient;
    })
    return res;
}

const Get_All_User_Service = async (params: User_Query_Type, pagination: Pagination_Options_Type) => {
    const { page, limit, skip } = calculate_pagination(pagination);
    const { search, ...filter_field } = params;
    const search_conditions: Prisma.UserWhereInput[] = [];
    const searchable_fields = ['email', 'role', 'user_status'];
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
    const where_conditions: Prisma.UserWhereInput = search_conditions.length > 0 ? { AND: search_conditions } : {}

    const total = await prisma.user.count({
        where: where_conditions
    })
    const res = await prisma.user.findMany({
        where: where_conditions,
        skip,
        take: limit,
        orderBy: pagination.sortBy && pagination.sortOrder ? {
            [pagination.sortBy]: pagination.sortOrder
        } : {
            createdAt: 'desc'
        },
        select: {
            id: true,
            email: true,
            role: true,
            need_password_change: true,
            user_status: true,
            createdAt: true,
            updatedAt: true,
            admin: true,
            patient: true,
            doctor: true,

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

const Update_User_Status_Service = async (id: string, status: User_Role) => {
    await prisma.user.findUniqueOrThrow({
        where: {
            id
        }
    })
    const res = await prisma.user.update({
        where: {
            id
        },
        data: status,
        select: {
            id: true,
            email: true,
            role: true,
            need_password_change: true,
            user_status: true,
            createdAt: true,
            updatedAt: true
        }
    })
    return res;
}

const Get_My_Profile_Data_Service = async (user: JwtPayload) => {
    const user_data = await prisma.user.findUniqueOrThrow({
        where: {
            email: user.email,
            user_status:"ACTIVE"
        },
        select: {
            id: true,
            email: true,
            role: true,
            need_password_change: true,
            user_status: true,
        }
    })
    let profiledata;
    if (user_data.role === User_Role.ADMIN || User_Role.SUPER_ADMIN) {
        profiledata = await prisma.admin.findUnique({
            where: { email: user_data.email }
        })
    }
    else if (user_data.role === User_Role.DOCTOR) {
        profiledata = await prisma.doctor.findUnique({
            where: { email: user_data.email }
        })
    }
    else if (user_data.role === User_Role.PATIENT) {
        profiledata = await prisma.patient.findUnique({
            where: { email: user_data.email }
        })
    }

    return { ...user_data, ...profiledata }
}

const Update_Profile_Service = async (token_data: JwtPayload, req: Request) => {

    if(req.file){
        const cloudinary_response = await Upload_To_Cloudinary(req.file);
        req.body.profile_photo = cloudinary_response?.secure_url
    }
    const user_data = await prisma.user.findUniqueOrThrow({
        where: {
            email: token_data.email,
            user_status:"ACTIVE"
        },
        select: {
            id: true,
            email: true,
            role: true,
            need_password_change: true,
            user_status: true,
        }
    })
    let profiledata;
    if (user_data.role === User_Role.ADMIN || User_Role.SUPER_ADMIN) {
        profiledata = await prisma.admin.update({
            where: { email: user_data.email },
            data: req.body
        })
    }
    else if (user_data.role === User_Role.DOCTOR) {
        profiledata = await prisma.doctor.update({
            where: { email: user_data.email },
            data: req.body
        })
    }
    else if (user_data.role === User_Role.PATIENT) {
        profiledata = await prisma.patient.update({
            where: { email: user_data.email },
            data: req.body
        })
    }

    return { ...user_data, ...profiledata }
}




export const User_Services = {
    Create_User_Admin_Service,
    Create_User_Doctor_Service,
    Create_User_Patient_Service,
    Get_All_User_Service,
    Update_User_Status_Service,
    Get_My_Profile_Data_Service,
    Update_Profile_Service
}


