import type { Request, Response } from "express";
import Async_Catch from "../../utils/try.code.js";
import { Schedule_Services } from "./schedule.services.js";
import httpStatus from 'http-status';



const Create_Schedule_Controller = Async_Catch(async (req: Request, res: Response) => {
    const result = await Schedule_Services.Create_Schedule_Service(req.body);
    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully Create Schedule",
        data: result
    })
})



export const Schedule_Controllers = {
    Create_Schedule_Controller,
}