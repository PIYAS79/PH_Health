import config from "../../config/index.js";
import nodemailer from 'nodemailer'

const Send_Email = async (email:string,html:string) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: config.nodemailer.base_email,
            pass: config.nodemailer.app_pass,
        },
    });


    const info = await transporter.sendMail({
        from: '"PH HEALTHCARE" <piyasmahmudealif@gmail.com>',
        to: email,
        subject: "Reset Password Link",
        // text: "Hello world?", // plain‑text body
        html, // HTML body
    });
}

export default Send_Email;