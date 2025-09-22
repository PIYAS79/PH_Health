import express from 'express';
import { User_Controllers } from './user.controllers.js';
import { User_Role } from '@prisma/client';
import Check_Roles from '../../middlewares/check_role.js';


const router = express.Router();


router.post('/',Check_Roles(User_Role.ADMIN,User_Role.SUPER_ADMIN),User_Controllers.Create_User_Admin_Controller);




export const User_Routes = router;