import express from 'express';
import { Admin_Controllers } from './admin.controllers.js';
import Validation_Request from '../../utils/request.validation.js';
import { Admin_Zod_Types } from './admin.zod.js';
import Check_Roles from '../../middlewares/check_role.js';
import { User_Role } from '@prisma/client';





const router = express.Router();

// get all admin from db
router.get('/',Check_Roles(User_Role.SUPER_ADMIN,User_Role.ADMIN), Admin_Controllers.Get_All_Admin_Controller);

// get single admin by id from db
router.get('/:id',Check_Roles(User_Role.SUPER_ADMIN,User_Role.ADMIN), Admin_Controllers.Get_Single_Admin_By_Id_Controller);

// update admin route
router.patch('/:id',Check_Roles(User_Role.SUPER_ADMIN,User_Role.ADMIN), Validation_Request(Admin_Zod_Types.Admin_Update), Admin_Controllers.Update_Admin_Data_Controller);

// delete admin and user data 
router.delete('/:id',Check_Roles(User_Role.SUPER_ADMIN,User_Role.ADMIN), Admin_Controllers.Delete_Admin_and_User_Controller);

// soft delete admin and user data 
router.delete('/soft/:id',Check_Roles(User_Role.SUPER_ADMIN,User_Role.ADMIN), Admin_Controllers.Soft_Delete_Admin_and_User_Controller);


export const Admin_Routes = router;