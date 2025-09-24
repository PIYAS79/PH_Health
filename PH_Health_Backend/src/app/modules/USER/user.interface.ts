



import { z } from 'zod';

const Zod_Create_Admin = z.object({
    password: z.string().min(1, "Password is required"),
    admin: z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().min(1, "Email is required"),
        contact_number: z.string().min(1, "Contact number is required"),
    }),
});



export const User_Validation = {
    Zod_Create_Admin,
}