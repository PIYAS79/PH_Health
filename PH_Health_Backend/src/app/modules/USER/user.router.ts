import express, { type NextFunction, type Request, type Response } from 'express';
import { User_Controllers } from './user.controllers.js';
import { User_Role } from '@prisma/client';
import Check_Roles from '../../middlewares/check_role.js';
import upload from '../../utils/multer.js';
import { User_Validation } from './user.interface.js';
import Validation_Request from '../../utils/request.validation.js';




const router = express.Router();

// get all user 
router.get('/', Check_Roles(User_Role.ADMIN, User_Role.SUPER_ADMIN), User_Controllers.Get_All_User_Controller);

// update user status
router.patch('/:id/status', Check_Roles(User_Role.ADMIN, User_Role.SUPER_ADMIN), Validation_Request(User_Validation.Zod_Update_User_Status), User_Controllers.Update_User_Status_Controller);

// fetch me 
router.get('/me',
     Check_Roles(User_Role.SUPER_ADMIN, User_Role.ADMIN, User_Role.DOCTOR, User_Role.PATIENT), User_Controllers.Get_My_Profile_Data_Controller);

router.post('/create-admin'
    , Check_Roles(User_Role.ADMIN, User_Role.SUPER_ADMIN),
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = User_Validation.Zod_Create_Admin.parse(JSON.parse(req.body.data))
        return User_Controllers.Create_User_Admin_Controller(req, res, next)
    }
)

router.post('/create-doctor'
    , Check_Roles(User_Role.ADMIN, User_Role.SUPER_ADMIN),
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = User_Validation.Zod_Create_Doctor.parse(JSON.parse(req.body.data))
        return User_Controllers.Create_User_Doctor_Controller(req, res, next)
    }
)

router.post('/create-patient',
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = User_Validation.Zod_Create_Patient.parse(JSON.parse(req.body.data))
        return User_Controllers.Create_User_Patient_Controller(req, res, next)
    }
)

router.patch('/update-profile',
    upload.single('file'),
    Check_Roles(User_Role.SUPER_ADMIN, User_Role.ADMIN, User_Role.DOCTOR, User_Role.PATIENT),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data)
        return User_Controllers.Update_Profile_Controller(req, res, next)
    }
)


export const User_Routes = router;