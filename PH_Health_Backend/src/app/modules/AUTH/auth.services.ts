import type { Login_Type } from "./auth.interface.js";
import bcrypt from 'bcrypt';
import { PrismaClient, User_Status } from "@prisma/client";
import { JWT_Helper } from "../../global/jwt_helper.js";
import config from "../../../config/index.js";
import httpStatus from 'http-status';
import Final_App_Error from "../../errors/Final_App_Error.js";
import Send_Email from "../../utils/send_email.js";
import type { JwtPayload } from "jsonwebtoken";


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

const Change_Password_Service = async (user: any, data: any) => {
    const user_data = await prisma.user.findUniqueOrThrow({
        where: {
            email: user.email,
            user_status: User_Status.ACTIVE
        }
    })
    const is_correct_pass: boolean = await bcrypt.compare(data.old_password, user_data.password);
    if (!is_correct_pass) {
        throw new Final_App_Error(httpStatus.FORBIDDEN, "Password not matched!")
    }
    const hashed_pass: string = await bcrypt.hash(data.new_password, 12);
    await prisma.user.update({
        where: {
            email: user_data.email
        },
        data: {
            password: hashed_pass,
            need_password_change: false
        }
    })
    return { message: "Successfully Change !" }

}

const Forgot_Passworrd_Service = async (data: { email: string }) => {
    const user_data = await prisma.user.findUniqueOrThrow({
        where: {
            email: data.email
        }
    })
    const forgot_token = JWT_Helper.generate_token({
        email: user_data.email,
        role: user_data.role
    }, config.jwt.forgot_token_secret as string, config.jwt.forgot_token_exp as string)

    const reset_pass_link = config.nodemailer.frontend_url + `?email=${user_data.email}&token=${forgot_token}`;
    await Send_Email(user_data.email, `
            <div>
                <p>Dear User,</p>
                <a href=${reset_pass_link}>
                    <button>
                        Reset Password
                    </button>
                </a>
            </div>
        `)

}

const Reset_Password_Service = async (token: string, data: { password: string }) => {
    if (!token) {
        throw new Final_App_Error(httpStatus.FORBIDDEN, "Token Not Found!")
    }
    const token_data: JwtPayload = JWT_Helper.verify_token(token, config.jwt.forgot_token_secret as string);
    const user_data = await prisma.user.findUniqueOrThrow({
        where: {
            email: token_data.email
        }
    })
    const hashed_pass = await bcrypt.hash(data.password, 12);
    await prisma.user.update({
        where: {
            email: user_data.email
        },
        data: {
            password: hashed_pass
        }
    })
    return {}
}



export const Auth_Services = {
    Login_Service,
    Fetch_Refresh_Token,
    Change_Password_Service,
    Forgot_Passworrd_Service,
    Reset_Password_Service
}

