import Async_Catch from "../../utils/try.code.js";
import type { NextFunction, Request, Response } from "express";
import httpStatus from 'http-status'
import { Admin_Services } from "./admin.services.js";
import pick from "../../utils/pick_fields.js";
import { queryable_fields_of_this_model } from "./admin.constant.js";





const Get_All_Admin_Controller = Async_Catch(async (req: Request, res: Response, next: NextFunction) => {
  const selected_query_fields = pick(req.query, queryable_fields_of_this_model);
  const pagination = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
  const result = await Admin_Services.Get_All_Admin_Service(selected_query_fields, pagination);
  res.status(httpStatus.OK).json({
    success: true,
    message: "Get all Admin successfully",
    meta: result.meta,
    data: result.data
  });
}
);

const Get_Single_Admin_By_Id_Controller = Async_Catch(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await Admin_Services.Get_Single_Admin_By_Id_Service(id as string);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Get Admin by Id successfully",
    data: result
  });
})

const Update_Admin_Data_Controller = Async_Catch(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await Admin_Services.Update_Admin_Data_Service(id as string, req.body);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Successfully Update Admin Data ",
    data: result
  });
})

const Delete_Admin_and_User_Controller = Async_Catch(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await Admin_Services.Delete_Admin_and_User_Service(id as string);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Successfully Deleted Admin and User Data ",
    data: result
  });
})

const Soft_Delete_Admin_and_User_Controller = Async_Catch(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await Admin_Services.Soft_Delete_Admin_and_User_Service(id as string);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Successfully Deleted Admin and User Data ",
    data: result
  });
})

export const Admin_Controllers = {
  Get_All_Admin_Controller,
  Get_Single_Admin_By_Id_Controller,
  Update_Admin_Data_Controller,
  Delete_Admin_and_User_Controller,
  Soft_Delete_Admin_and_User_Controller,
}

