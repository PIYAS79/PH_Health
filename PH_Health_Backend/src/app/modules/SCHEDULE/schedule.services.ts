import type { Create_Schedule_Type } from "./schedule.interface.js";
import {addHours,format} from 'date-fns'

const Create_Schedule_Service = async(payload:Create_Schedule_Type)=>{
    const {startDate,endDate,startTime,endTime} = payload

    const currentDate = new Date(startDate);
    const lastDate = new Date(endDate);

    while(currentDate<=lastDate){
        const startDateTime = new Date(
            addHours(
                `${format(currentDate,'yyyy-MM-dd')}`,
                Number(startTime.split(':')[0])
            )
        )
        const endDateTime = new Date(
            addHours(
                `${format(endDate,'yyyy-MM-dd')}`,
                Number(endTime.split(':')[0])
            )
        )
    }

    return {}
}


export const Schedule_Services = {
    Create_Schedule_Service,

}