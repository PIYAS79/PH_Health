import { PrismaClient } from "@prisma/client";
import type { JwtPayload } from "jsonwebtoken";
import type { Create_Doc_Schedule_Type } from "./doctor.schedule.interface.js";

const prisma = new PrismaClient();



const Create_Doctor_Schedule_Service = async (user: JwtPayload, payload: Create_Doc_Schedule_Type) => {
    const doctor_data = await prisma.doctor.findUniqueOrThrow({
        where: {
            email: user.email
        }
    })
    const insertedData = payload.schedule_id.map((one: string) => ({
        doctorId: doctor_data.id,
        scheduleId: one
    }))
    const result = await prisma.doctorSchedules.createMany({
        data: insertedData
    })
    return result;
}


export const Doctor_Schedule_Services = {
    Create_Doctor_Schedule_Service,

}