import express, { type NextFunction, type Request, type Response } from "express";
import { Specialties_Controllers } from "./specialties.controllers.js";
import Check_Roles from "../../middlewares/check_role.js";
import { User_Role } from "@prisma/client";
import upload from "../../utils/multer.js";
import Validation_Request from "../../utils/request.validation.js";
import { Specialties_Validations } from "./specialties.interface.js";

const router = express.Router()


router.post('/',
    Check_Roles(User_Role.ADMIN, User_Role.SUPER_ADMIN),
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = Specialties_Validations.Zod_Create_Specialties.parse(JSON.parse(req.body.data))
        return Specialties_Controllers.Create_Specialties_Controller(req, res, next)
    });

export const Specialties_Routes = router;