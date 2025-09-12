import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import Async_Catch from "../../utils/try.code.js";

const Get_All_User_Controller = Async_Catch(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = {};
    console.log("HIT");
    res.status(httpStatus.OK).json({
      success: true,
      message: "Successfully Get All Users",
      data: result,
    });
  }
);


export const User_Controllers = {
    Get_All_User_Controller,
}