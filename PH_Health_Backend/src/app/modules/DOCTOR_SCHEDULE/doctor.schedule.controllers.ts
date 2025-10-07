import type { Request, Response } from "express";
import Async_Catch from "../../utils/try.code.js";
import { Doctor_Schedule_Services } from "./doctor.schedule.services.js";
import httpStatus from 'http-status';
import type { JwtPayload } from "jsonwebtoken";


const Create_Doctor_Schedule_Controller = Async_Catch(async (req: Request &{user?:JwtPayload}, res: Response) => {

    const {user} = req as JwtPayload
    const result = await Doctor_Schedule_Services.Create_Doctor_Schedule_Service(user,req.body)

    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully Create Doctor Schedule",
        data: result
    })
})


export const Doctor_Schedule_Controllers = {
    Create_Doctor_Schedule_Controller,

}