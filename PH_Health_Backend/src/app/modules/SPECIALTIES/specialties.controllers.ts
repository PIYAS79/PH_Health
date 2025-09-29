import type { Request, Response } from "express";
import Async_Catch from "../../utils/try.code.js";
import { Specialties_Services } from "./specialties.services.js";
import httpStatus from 'http-status'

const Create_Specialties_Controller = Async_Catch(async (req: Request, res: Response) => {
    const result = await Specialties_Services.Create_Specialties_Service(req);

    res.status(httpStatus.OK).json({
        success: true,
        message: "Specialties created Successfully",
        data: result
    })
})



export const Specialties_Controllers = {
    Create_Specialties_Controller,
    
}