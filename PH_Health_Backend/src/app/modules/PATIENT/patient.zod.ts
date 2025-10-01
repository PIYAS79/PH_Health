import z from "zod";
import { BloodGroup, MaritalStatus, Gender } from '@prisma/client'



const Patient_Update = z.object({
    body: z.object({
        name: z.string().optional(),
        profile_photo: z.string().optional(),
        contact_number: z.string().optional(),
        email: z.string().optional(),
        address: z.string().optional(),
        patientHealthData: z.object({
            gender: z.enum([Gender.FEMALE, Gender.MALE]).optional(),
            dateOfBirth: z.string().optional(),
            bloodGroup: z.enum([BloodGroup.AB_NEGATIVE, BloodGroup.AB_POSITIVE, BloodGroup.A_NEGATIVE, BloodGroup.A_POSITIVE, BloodGroup.B_NEGATIVE, BloodGroup.B_POSITIVE, BloodGroup.O_NEGATIVE, BloodGroup.O_POSITIVE]).optional(),
            hasAllergies: z.boolean().optional(),
            hasDiabetes: z.boolean().optional(),
            height: z.string().optional(),
            weight: z.string().optional(),
            smokingStatus: z.boolean().optional(),
            dietaryPreferences: z.string().optional(),
            pregnancyStatus: z.boolean().optional(),
            mentalHealthHistory: z.string().optional(),
            hasPastSurgeries: z.boolean().optional(),
            recentAnxiety: z.boolean().optional(),
            recentDepression: z.boolean().optional(),
            maritalStatus: z.enum([MaritalStatus.MARRIED, MaritalStatus.UNMARRIED]).optional()
        }).optional(),
        medicalReport: z.object({
            reportName: z.string().optional(),
            reportLink: z.string().optional(),
        }).optional()
    })
})


export const Patient_Zod_Types = {
    Patient_Update,

}