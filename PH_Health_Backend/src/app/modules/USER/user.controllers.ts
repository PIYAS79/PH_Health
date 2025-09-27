import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import Async_Catch from "../../utils/try.code.js";
import { User_Services } from "./user.services.js";
import pick from "../../utils/pick_fields.js";
import { queryable_fields_of_user } from "./user.constant.js";

const Create_User_Admin_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {

  const result = await User_Services.Create_User_Admin_Service(req);
  res.status(httpStatus.OK).json({
    success: true,
    message: "Admin created successfully",
    data: result,
  });
}
);

const Create_User_Doctor_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {

  const result = await User_Services.Create_User_Doctor_Service(req);
  res.status(httpStatus.OK).json({
    success: true,
    message: "Doctor created successfully",
    data: result,
  });
}
);

const Create_User_Patient_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {

  const result = await User_Services.Create_User_Patient_Service(req);
  res.status(httpStatus.OK).json({
    success: true,
    message: "Patient created successfully",
    data: result,
  });
}
);

const Get_All_User_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {
  const selected_query_fields = pick(req.query, queryable_fields_of_user);
  const pagination = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
  const result = await User_Services.Get_All_User_Service(selected_query_fields, pagination);
  res.status(httpStatus.OK).json({
    success: true,
    message: "Get all Admin successfully",
    meta: result.meta,
    data: result.data
  });
}
);

const Update_User_Status_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {
  const {id} = req.params;
  console.log(id);
console.log(req.body);
  const result = await User_Services.Update_User_Status_Service(id as string,req.body);
  res.status(httpStatus.OK).json({
    success: true,
    message: "User update successfully",
    data: result,
  });
}
);



export const User_Controllers = {
  Create_User_Admin_Controller,
  Create_User_Doctor_Controller,
  Create_User_Patient_Controller,
  Get_All_User_Controller,
  Update_User_Status_Controller
}