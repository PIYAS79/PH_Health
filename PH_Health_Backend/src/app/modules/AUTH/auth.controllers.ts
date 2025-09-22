import type { Request, Response } from "express";
import Async_Catch from "../../utils/try.code.js";
import { Auth_Services } from "./auth.services.js";
import httpStatus from 'http-status';



const Login_Controller = Async_Catch(async (req: Request, res: Response) => {
    const result = await Auth_Services.Login_Service(req.body);
    res.cookie('ref_token', result.refresh_token, {
        secure: false,
        httpOnly: true
    })
    res.status(httpStatus.OK).json({
        success: true,
        message: "Login successfull",
        data: {
            access_token: result.access_token,
            need_password_change: result.need_password_change
        },
    });
})

const Fetch_Refresh_Token_Controller = Async_Catch(async (req: Request, res: Response) => {
    const {ref_token} = req.cookies
    const result = await Auth_Services.Fetch_Refresh_Token(ref_token);
    res.status(httpStatus.OK).json({
        success: true,
        message: "Successfully Fetch AT from RT",
        data: result,
    });
})



export const Auth_Controller = {
    Login_Controller,
    Fetch_Refresh_Token_Controller,
}