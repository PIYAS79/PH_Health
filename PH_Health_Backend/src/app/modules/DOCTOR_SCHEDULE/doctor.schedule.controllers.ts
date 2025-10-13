import type { Request, Response } from "express";
import Async_Catch from "../../utils/try.code.js";
import { Doctor_Schedule_Services } from "./doctor.schedule.services.js";
import httpStatus from 'http-status';
import type { JwtPayload } from "jsonwebtoken";
import pick from "../../utils/pick_fields.js";

const queryable_fields_of_patient = ["isBooked", "startDateTimeQuery", "endDateTimeQuery"]

const Create_Doctor_Schedule_Controller = Async_Catch(async (req: Request & { user?: JwtPayload }, res: Response) => {

    const { user } = req as JwtPayload
    const result = await Doctor_Schedule_Services.Create_Doctor_Schedule_Service(user, req.body)

    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully Create Doctor Schedule",
        data: result
    })
})


const Get_All_Doctor_Schedule_Controller = Async_Catch(async (req: Request & { user?: JwtPayload }, res: Response) => {
    const selected_query_fields = pick(req.query, queryable_fields_of_patient);
    const pagination = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const user = req.user as JwtPayload
    const result = await Doctor_Schedule_Services.Get_Doctor_Schedule_Service(selected_query_fields, pagination, user);
    res.status(httpStatus.OK).json({
        success: true,
        message: "Get all Patient successfully",
        meta: result.meta,
        data: result.data
    });
}
);

const Delete_Doctor_Schedule_Controller = Async_Catch(async (req: Request & { user?: JwtPayload }, res: Response) => {
    const { user } = req as JwtPayload
    const { id } = req.params;
    const result = await Doctor_Schedule_Services.Delete_A_Doctor_Schedule(user,id as string)

    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully Delete Doctor Schedule",
        data: result
    })
})



export const Doctor_Schedule_Controllers = {
    Create_Doctor_Schedule_Controller,
    Get_All_Doctor_Schedule_Controller,
    Delete_Doctor_Schedule_Controller

}