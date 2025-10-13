import type { Request, Response } from "express";
import Async_Catch from "../../utils/try.code.js";
import { Schedule_Services } from "./schedule.services.js";
import httpStatus from 'http-status';
import pick from "../../utils/pick_fields.js";
import type { JwtPayload } from "jsonwebtoken";

const queryable_fields_of_patient = ["startDateTimeQuery","endDateTimeQuery"]

const Create_Schedule_Controller = Async_Catch(async (req: Request, res: Response) => {
    const result = await Schedule_Services.Create_Schedule_Service(req.body);
    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully Create Schedule",
        data: result
    })
})

const Get_All_Schedule_Controller = Async_Catch(async (req: Request &{user?:JwtPayload}, res: Response) => {
    const selected_query_fields = pick(req.query, queryable_fields_of_patient);
    const pagination = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const user = req.user as JwtPayload
    const result = await Schedule_Services.Get_All_Schedule_Service(selected_query_fields, pagination,user);
    res.status(httpStatus.OK).json({
        success: true,
        message: "Get all Patient successfully",
        meta: result.meta,
        data: result.data
    });
}
);



export const Schedule_Controllers = {
    Create_Schedule_Controller,
    Get_All_Schedule_Controller,
}