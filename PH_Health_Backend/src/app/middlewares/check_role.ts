import type { NextFunction, Request, Response } from "express";
import { JWT_Helper } from "../global/jwt_helper.js";
import config from "../../config/index.js";
import Final_App_Error from "../errors/Final_App_Error.js";
import httpStatus from 'http-status';




const Check_Roles = (...roles:string[])=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const token = req.headers.authorization;
            if(!token){
                throw new Final_App_Error (httpStatus.UNAUTHORIZED,"you are not authorized")
            }
            const verified_user = JWT_Helper.verify_token(token,config.jwt.access_token_secret as string)
            if(roles.length && !roles.includes(verified_user.role)){
                throw new Final_App_Error (httpStatus.FORBIDDEN,"forbidden request")
            }
            next()
        }catch(err:any){
            next(err);
        }
    }
}


export default Check_Roles;