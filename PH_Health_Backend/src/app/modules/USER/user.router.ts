import express, { type NextFunction, type Request, type Response } from 'express';
import { User_Controllers } from './user.controllers.js';
import { User_Role } from '@prisma/client';
import Check_Roles from '../../middlewares/check_role.js';
import upload from '../../utils/multer.js';
import { User_Validation } from './user.interface.js';




const router = express.Router();


router.post('/create-admin'
    , Check_Roles(User_Role.ADMIN, User_Role.SUPER_ADMIN),
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = User_Validation.Zod_Create_Admin.parse(JSON.parse(req.body.data))
        return User_Controllers.Create_User_Admin_Controller(req,res,next)
    }
)

router.post('/create-doctor'
    , Check_Roles(User_Role.ADMIN, User_Role.SUPER_ADMIN),
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = User_Validation.Zod_Create_Doctor.parse(JSON.parse(req.body.data))
        return User_Controllers.Create_User_Doctor_Controller(req,res,next)
    }
)

router.post('/create-patient',
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = User_Validation.Zod_Create_Patient.parse(JSON.parse(req.body.data))
        return User_Controllers.Create_User_Patient_Controller(req,res,next)
    }
)

export const User_Routes = router;