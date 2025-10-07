import express from 'express';
import Check_Roles from '../../middlewares/check_role.js';
import { User_Role } from '@prisma/client';
import { Doctor_Schedule_Controllers } from './doctor.schedule.controllers.js';

const router = express.Router();


router.post('/',

    Check_Roles(User_Role.DOCTOR,User_Role.ADMIN,User_Role.SUPER_ADMIN),
    Doctor_Schedule_Controllers.Create_Doctor_Schedule_Controller
)



export const Doctor_Schedule_Routes = router;