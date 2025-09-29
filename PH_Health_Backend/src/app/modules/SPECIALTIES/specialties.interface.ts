import { z } from 'zod';



const Zod_Create_Specialties = z.object({
    title: z.string().min(1, "title is required")
});



export const Specialties_Validations = {
    Zod_Create_Specialties,

}