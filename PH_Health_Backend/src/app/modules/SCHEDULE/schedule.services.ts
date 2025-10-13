import { Prisma, PrismaClient, type Schedule } from "@prisma/client";
import type { Create_Schedule_Type } from "./schedule.interface.js";
import { addHours, addMinutes, format } from 'date-fns'
import type { Pagination_Options_Type } from "../../global/pagination.js";
import calculate_pagination from "../../global/pagination.js";
import type { JwtPayload } from "jsonwebtoken";

const prisma = new PrismaClient();


const Create_Schedule_Service = async (payload: Create_Schedule_Type): Promise<Schedule[]> => {
    const { startDate, endDate, startTime, endTime } = payload
    const currentDate = new Date(startDate);
    const lastDate = new Date(endDate);
    const interval_time = 30;
    const schedules = [];

    while (currentDate <= lastDate) {
        const startDateTime = new Date(
            addMinutes(
                addHours(
                    `${format(currentDate, 'yyyy-MM-dd')}`,
                    Number(startTime.split(':')[0])
                ),
                Number(startTime.split(':')[1])
            )
        )
        const endDateTime = new Date(
            addMinutes(
                addHours(
                    `${format(currentDate, 'yyyy-MM-dd')}`,
                    Number(endTime.split(':')[0])
                ),
                Number(startTime.split(':')[1])
            )
        )
        while (startDateTime < endDateTime) {
            const scheduleData = {
                startDateTime: startDateTime,
                endDateTime: addMinutes(startDateTime, interval_time)
            }
            const existedData = await prisma.schedule.findFirst({
                where: {
                    startDateTime: scheduleData.startDateTime,
                    endDateTime: scheduleData.endDateTime
                }
            })
            if (!existedData) {
                const result = await prisma.schedule.create({
                    data: scheduleData
                })
                schedules.push(result);
            }
            startDateTime.setMinutes(startDateTime.getMinutes() + interval_time);
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return schedules;
}


const Get_All_Schedule_Service = async (params: any, pagination: Pagination_Options_Type, user: JwtPayload) => {
    const { page, limit, skip } = calculate_pagination(pagination);
    const { startDateTimeQuery, endDateTimeQuery, ...filter_field } = params;
    const search_conditions: Prisma.ScheduleWhereInput[] = [];

    if (startDateTimeQuery && endDateTimeQuery) {
        search_conditions.push({
            AND: [
                {
                    startDateTime: {
                        gte: startDateTimeQuery
                    }
                }, {
                    endDateTime: {
                        lte: endDateTimeQuery
                    }
                }
            ]
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
    const where_conditions: Prisma.ScheduleWhereInput = { AND: search_conditions }


    const doctorSchedule = await prisma.doctorSchedules.findMany({
        where: {
            doctor: {
                email: user.email
            }
        }
    })

    const doctorScheduleIds = doctorSchedule.map(one => one.scheduleId);
    
    const total = await prisma.schedule.count({
        where: {
            ...where_conditions,
            id: {
                notIn: doctorScheduleIds
            }
        },
    })

    const res = await prisma.schedule.findMany({
        where: {
            ...where_conditions,
            id: {
                notIn: doctorScheduleIds
            }
        },
        skip,
        take: limit,
        orderBy: pagination.sortBy && pagination.sortOrder ? {
            [pagination.sortBy]: pagination.sortOrder
        } : {
            createdAt: 'desc'
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

export const Schedule_Services = {
    Create_Schedule_Service,
    Get_All_Schedule_Service
}