import type { Request, Response, NextFunction } from "express";
import type z from "zod";


const Validation_Request = (schema: z.ZodTypeAny) => async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    try {
        await schema.parseAsync({
            body: req.body
        })
        return next();
    } catch (err: any) {
        next(err);
    }
}



export default Validation_Request;