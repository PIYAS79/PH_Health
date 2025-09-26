



import { Gender } from '@prisma/client';
import { z } from 'zod';

const Zod_Create_Admin = z.object({
    password: z.string().min(1, "Password is required"),
    admin: z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().min(1, "Email is required"),
        contact_number: z.string().min(1, "Contact number is required"),
    }),
});

const Zod_Create_Doctor = z.object({
    password: z.string().min(1, "Password is required"),
    doctor: z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().min(1, "Email is required"),
        contact_number: z.string().min(1, "Contact number is required"),
        address: z.string().optional(),
        reg_number: z.string().min(1, "Registration number is required"),
        experience: z.number().optional(),
        gender: z.enum([Gender.FEMALE, Gender.MALE]),
        appointment_fee: z.number().min(1, "Appointment_fee is required"),
        qualification: z.string().min(1, "Qualification is required"),
        current_working_place: z.string().min(1, "Current working place is required"),
        designation: z.string().min(1, "Designation is required"),
    }),
});

const Zod_Create_Patient = z.object({
    password: z.string().min(1, "Password is required"),
    patient: z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().min(1, "Email is required"),
        contact_number: z.string().min(1, "Contact number is required"),
        address: z.string().optional(),
    }),
});


export const User_Validation = {
    Zod_Create_Admin,
    Zod_Create_Doctor,
    Zod_Create_Patient,
}