import { z } from 'zod';

export const Login = z.object({
    body: z.object({
        email: z.string(),
        password: z.string()
    })
})





export const Auth_Zod_Types = {
    Login
}



