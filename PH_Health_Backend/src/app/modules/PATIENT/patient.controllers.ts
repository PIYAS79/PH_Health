import type { Request, Response } from "express";
import Async_Catch from "../../utils/try.code.js";
import pick from "../../utils/pick_fields.js";
import { Patient_Services } from "./patient.services.js";
import httpStatus from 'http-status'

const queryable_fields_of_patient = ["name","email","contact_number","address","search"]



const Get_All_Patient_Controller = Async_Catch(async (req: Request, res: Response) => {
    const selected_query_fields = pick(req.query, queryable_fields_of_patient);
    const pagination = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const result = await Patient_Services.Get_All_Patient_Service(selected_query_fields, pagination);
    res.status(httpStatus.OK).json({
        success: true,
        message: "Get all Patient successfully",
        meta: result.meta,
        data: result.data
    });
}
);

const Get_Single_Patient_Controller = Async_Catch(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await Patient_Services.Get_Single_Patient_Service(id as string);
  res.status(httpStatus.OK).json({
    success: true,
    message: "Get Patient by Id successfully",
    data: result
  });
})

const Update_Patient_Controller = Async_Catch(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await Patient_Services.Update_Patient_Service(id as string,req.body);
  res.status(httpStatus.OK).json({
    success: true,
    message: "Update Patient successfully",
    data: result
  });
})

const Delete_Patient_Controller = Async_Catch(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await Patient_Services.Delete_Patient_Service(id as string);
  res.status(httpStatus.OK).json({
    success: true,
    message: "Delete Patient's all info successfully",
    data: result
  });
})

const Soft_Delete_Patient_Controller = Async_Catch(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await Patient_Services.Soft_Delete_Patient_Service(id as string);
  res.status(httpStatus.OK).json({
    success: true,
    message: "Delete Patient's all info successfully",
    data: result
  });
})


export const Patient_Controller = {
    Get_All_Patient_Controller,
    Get_Single_Patient_Controller,
    Update_Patient_Controller,
    Delete_Patient_Controller,
    Soft_Delete_Patient_Controller
}