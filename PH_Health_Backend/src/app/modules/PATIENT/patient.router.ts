import express from 'express';
import Validation_Request from '../../utils/request.validation.js';
import Check_Roles from '../../middlewares/check_role.js';
import { User_Role } from '@prisma/client';
import { Patient_Controller } from './patient.controllers.js';





const router = express.Router();

// get all patient from db
router.get('/',Check_Roles(User_Role.SUPER_ADMIN,User_Role.ADMIN), Patient_Controller.Get_All_Patient_Controller);

// get single patient by id from db
router.get('/:id',Check_Roles(User_Role.SUPER_ADMIN,User_Role.ADMIN), Patient_Controller.Get_Single_Patient_Controller);


export const Patient_Routes = router;