import { PrismaClient, type Schedule } from "@prisma/client";
import type { Create_Schedule_Type } from "./schedule.interface.js";
import { addHours, addMinutes, format } from 'date-fns'

const prisma = new PrismaClient();


const Create_Schedule_Service = async (payload: Create_Schedule_Type):Promise<Schedule[]> => {
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


export const Schedule_Services = {
    Create_Schedule_Service,

}