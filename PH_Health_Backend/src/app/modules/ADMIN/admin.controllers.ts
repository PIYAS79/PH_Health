import Async_Catch from "../../utils/try.code.js";
import type { NextFunction, Request, Response } from "express";
import httpStatus from 'http-status'
import { Admin_Services } from "./admin.services.js";
import pick from "../../utils/pick_fields.js";
import { queryable_fields_of_this_model } from "./admin.constant.js";





const Get_All_Admin_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {
  const selected_query_fields = pick(req.query,queryable_fields_of_this_model);
  const pagination = pick(req.query,["page","limit","sortBy","sortOrder"]);
  const result = await Admin_Services.Get_All_Admin_Service(selected_query_fields,pagination);
    res.status(httpStatus.OK).json({
      success: true,
      message: "Get all Admin successfully",
      data: result,
    });
  }
);


export const Admin_Controllers = {
    Get_All_Admin_Controller,
}

