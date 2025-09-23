import express from 'express';
import Validation_Request from '../../utils/request.validation.js';
import { Auth_Controller } from './auth.controllers.js';
import { Auth_Zod_Types } from './auth.zod.js';
import Check_Roles from '../../middlewares/check_role.js';
import { User_Role } from '@prisma/client';


const router = express.Router();


router.post('/login',Validation_Request(Auth_Zod_Types.Login),Auth_Controller.Login_Controller);
router.post('/refresh-token',Auth_Controller.Fetch_Refresh_Token_Controller);
router.patch('/change-password',Check_Roles(User_Role.ADMIN,User_Role.DOCTOR,User_Role.PATIENT,User_Role.SUPER_ADMIN),Validation_Request(Auth_Zod_Types.Change_Password),Auth_Controller.Change_Password_Controller);
router.post('/forgot-pass',Validation_Request(Auth_Zod_Types.forgot_password),Auth_Controller.Forgot_Password_Controller);
router.post('/reset-pass',Validation_Request(Auth_Zod_Types.Reset_Password),Auth_Controller.Reset_Password_Controller)



export const Auth_Routes = router;