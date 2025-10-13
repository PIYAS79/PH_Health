import express from 'express';
import { Schedule_Controllers } from './schedule.controllers.js';
import Check_Roles from '../../middlewares/check_role.js';
import { User_Role } from '@prisma/client';



const router = express.Router();


router.post('/',
    Check_Roles(User_Role.ADMIN, User_Role.SUPER_ADMIN),
    Schedule_Controllers.Create_Schedule_Controller
)

router.get('/',
    Check_Roles(User_Role.ADMIN, User_Role.SUPER_ADMIN,User_Role.DOCTOR),
    Schedule_Controllers.Get_All_Schedule_Controller
)

export const Schedule_Routes = router;