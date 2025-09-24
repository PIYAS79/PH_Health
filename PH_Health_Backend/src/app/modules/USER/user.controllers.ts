import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import Async_Catch from "../../utils/try.code.js";
import { User_Services } from "./user.services.js";

const Create_User_Admin_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {
  
  const result = await User_Services.Create_User_Admin_Service(req);
    res.status(httpStatus.OK).json({
      success: true,
      message: "Admin created successfully",
      data: result,
    });
  }
);


export const User_Controllers = {
    Create_User_Admin_Controller,
}