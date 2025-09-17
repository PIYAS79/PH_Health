import Async_Catch from "../../utils/try.code.js";
import type { NextFunction, Request, Response } from "express";
import httpStatus from 'http-status'
import { Admin_Services } from "./admin.services.js";


const Get_All_Admin_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {
  const result = await Admin_Services.Get_All_Admin_Service(req.query);
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