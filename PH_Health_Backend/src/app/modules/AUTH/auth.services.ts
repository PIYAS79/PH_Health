import type { Login_Type } from "./auth.interface.js";
import bcrypt from 'bcrypt';
import { PrismaClient, User_Status } from "@prisma/client";
import { JWT_Helper } from "../../global/jwt_helper.js";
import config from "../../../config/index.js";


const prisma = new PrismaClient();

const Login_Service = async (data: Login_Type) => {
    const user_data = await prisma.user.findUniqueOrThrow({
        where: {
            email: data.email,
            user_status: User_Status.ACTIVE
        }
    })
    const is_pass_match = await bcrypt.compare(data.password, user_data.password);
    if (!is_pass_match) {
        throw new Error("Password not match !!")
    }
    const access_token = JWT_Helper.generate_token({
        email: user_data.email,
        role: user_data.role
    }, config.jwt.access_token_secret as string, config.jwt.access_token_exp as string)

    const refresh_token = JWT_Helper.generate_token({
        email: user_data.email,
        role: user_data.role
    }, config.jwt.refresh_token_secret as string, config.jwt.refresh_token_exp as string)

    return {
        access_token,
        refresh_token,
        need_password_change: user_data.need_password_change
    }
}

const Fetch_Refresh_Token = async (token: string) => {
    let decrypted_data;
    try {
        decrypted_data = JWT_Helper.verify_token(token, config.jwt.refresh_token_secret as string);
    } catch (err: any) {
        throw new Error("you are not authorized !")
    }
    const user_data = await prisma.user.findUniqueOrThrow({
        where: {
            email: decrypted_data?.email,
            user_status: User_Status.ACTIVE
        }
    })
    const access_token = JWT_Helper.generate_token({
        email: user_data.email,
        role: user_data.role
    }, config.jwt.access_token_secret as string, config.jwt.access_token_exp as string)

    return { access_token, need_password_change: user_data.need_password_change }
}

export const Auth_Services = {
    Login_Service,
    Fetch_Refresh_Token,
}

