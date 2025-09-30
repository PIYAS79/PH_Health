import type { Request, Response } from "express";
import Async_Catch from "../../utils/try.code.js";
import { Doctor_Services } from "./doctor.services.js";
import httpStatus from 'http-status';
import pick from "../../utils/pick_fields.js";

const queryable_field_of_doctor = ["name","specialties" ,"email", "search", "contact_number", "experience", "appointment_fee", "qualification", "current_working_place", "designation"]

const Get_All_Doctor_Controller = Async_Catch(async (req: Request, res: Response) => {
    const selected_query_fields = pick(req.query, queryable_field_of_doctor);
    const pagination = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const result = await Doctor_Services.Get_All_Doctor_Service(selected_query_fields, pagination);
    res.status(httpStatus.OK).json({
        success: true,
        message: "Get all Doctor successfully",
        meta: result.meta,
        data: result.data
    });
})

const Get_Single_Doctor_Controller = Async_Catch(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await Doctor_Services.Get_Single_Doctor_Service(id as string);
    res.status(httpStatus.OK).json({
        success: true,
        message: "Get Doctor successfully",
        data: result
    });
})

const Delete_Doctor_and_User_Controller = Async_Catch(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await Doctor_Services.Delete_Doctor_and_User_Service(id as string);

    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully Deleted Doctor and User Data ",
        data: result
    });
})

const Soft_Delete_Doctor_and_User_Controller = Async_Catch(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await Doctor_Services.Soft_Delete_Doctor_and_User_Service(id as string);

    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully Deleted Doctor and User Data ",
        data: result
    });
})

const Update_Doctor_Controller = Async_Catch(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await Doctor_Services.Update_Doctor_Service(id as string,req.body);

    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully Update Doctor Data ",
        data: result
    });
})

export const Doctor_Controllers = {
    Get_All_Doctor_Controller,
    Get_Single_Doctor_Controller,
    Delete_Doctor_and_User_Controller,
    Soft_Delete_Doctor_and_User_Controller,
    Update_Doctor_Controller
}