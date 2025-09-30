
import { User_Role } from '@prisma/client';
import express from 'express';
import Check_Roles from '../../middlewares/check_role.js';
import { Doctor_Controllers } from './doctor.controllers.js';


const router = express.Router();



router.get('/',
    Check_Roles(User_Role.ADMIN,User_Role.DOCTOR,User_Role.PATIENT,User_Role.SUPER_ADMIN),
    Doctor_Controllers.Get_All_Doctor_Controller
)

router.get('/:id',
    Check_Roles(User_Role.ADMIN,User_Role.DOCTOR,User_Role.PATIENT,User_Role.SUPER_ADMIN),
    Doctor_Controllers.Get_Single_Doctor_Controller
)

// hard delete doctor
router.delete('/:id',Check_Roles(User_Role.DOCTOR,User_Role.SUPER_ADMIN,User_Role.ADMIN), Doctor_Controllers.Delete_Doctor_and_User_Controller);

// soft delete doctor
router.delete('/soft/:id',Check_Roles(User_Role.DOCTOR,User_Role.SUPER_ADMIN,User_Role.ADMIN), Doctor_Controllers.Soft_Delete_Doctor_and_User_Controller);

// update doctor
router.patch('/:id',Check_Roles(User_Role.DOCTOR,User_Role.SUPER_ADMIN,User_Role.ADMIN), Doctor_Controllers.Update_Doctor_Controller);


export const Doctor_Routes = router;