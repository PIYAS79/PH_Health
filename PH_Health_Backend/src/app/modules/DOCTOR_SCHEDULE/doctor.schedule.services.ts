import { Prisma, PrismaClient } from "@prisma/client";
import type { JwtPayload } from "jsonwebtoken";
import type { Create_Doc_Schedule_Type } from "./doctor.schedule.interface.js";
import calculate_pagination, { type Pagination_Options_Type } from "../../global/pagination.js";
import Final_App_Error from "../../errors/Final_App_Error.js";
import httpStatus from 'http-status'

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

const Get_Doctor_Schedule_Service = async (params: any, pagination: Pagination_Options_Type, user: JwtPayload) => {
    const { page, limit, skip } = calculate_pagination(pagination);
    const { startDateTimeQuery, endDateTimeQuery, ...filter_field } = params;
    const search_conditions: Prisma.DoctorSchedulesWhereInput[] = [];

    if (startDateTimeQuery && endDateTimeQuery) {
        search_conditions.push({
            AND: [
                {
                    schedule: {
                        startDateTime: {
                            gte: startDateTimeQuery
                        }
                    }
                }, {
                    schedule: {
                        endDateTime: {
                            lte: endDateTimeQuery
                        }
                    }
                }
            ]
        })
    }

    if (Object.keys(filter_field).length > 0) {
        if (typeof filter_field.isBooked === 'string' && filter_field.isBooked === 'true') {
            filter_field.isBooked = true
        }
        else if (typeof filter_field.isBooked === 'string' && filter_field.isBooked === 'false') {
            filter_field.isBooked = false
        }
        search_conditions.push({
            AND: Object.keys(filter_field).map((field) => ({
                [field]: {
                    equals: (filter_field as any)[field]
                }
            }))
        })
    }
    const where_conditions: Prisma.DoctorSchedulesWhereInput = { AND: search_conditions }



    const total = await prisma.doctorSchedules.count({
        where: where_conditions
    })

    const res = await prisma.doctorSchedules.findMany({
        where: where_conditions,
        skip,
        take: limit,
        orderBy: pagination.sortBy && pagination.sortOrder ? {
            [pagination.sortBy]: pagination.sortOrder
        } : {

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

const Delete_A_Doctor_Schedule = async (user: JwtPayload, schedule_id: string) => {
    const doctor_data = await prisma.doctor.findUniqueOrThrow({
        where: {
            email: user.email
        }
    })

    const isBookedSchedule = await prisma.doctorSchedules.findFirst({
        where:{
            doctorId:doctor_data.id,
            scheduleId:schedule_id,
            isBooked:true
        }
    })

    if(isBookedSchedule){
        throw new Final_App_Error(httpStatus.BAD_REQUEST,"Schedule is already booked !")
    }

    const res = await prisma.doctorSchedules.delete({
        where: {
            doctorId_scheduleId: {
                doctorId: doctor_data.id,
                scheduleId: schedule_id
            }
        }
    })
    return res;
}


export const Doctor_Schedule_Services = {
    Create_Doctor_Schedule_Service,
    Get_Doctor_Schedule_Service,
    Delete_A_Doctor_Schedule
}