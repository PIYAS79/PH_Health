import { z } from 'zod';

export const Login = z.object({
    body: z.object({
        email: z.string(),
        password: z.string()
    })
})

export const Change_Password = z.object({
    body: z.object({
        old_password: z.string(),
        new_password: z.string()
    })
})

export const forgot_password = z.object({
    body: z.object({
        email: z.string()
    })
})

export const Reset_Password = z.object({
    body: z.object({
        email: z.string(),
        password: z.string()
    })
})


export const Auth_Zod_Types = {
    Login,
    Change_Password,
    forgot_password,
    Reset_Password
}



