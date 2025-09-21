import z from "zod";




const Admin_Update = z.object({
    body: z.object({
        name : z.string().optional(),
        profile_photo : z.string().optional(),
        contact_number : z.string().optional()
    })
})


export const Admin_Zod_Types = {
    Admin_Update,
}