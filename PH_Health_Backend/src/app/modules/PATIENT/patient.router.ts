import express from 'express';
import Validation_Request from '../../utils/request.validation.js';
import Check_Roles from '../../middlewares/check_role.js';
import { User_Role } from '@prisma/client';
import { Patient_Controller } from './patient.controllers.js';
import { Patient_Zod_Types } from './patient.zod.js';





const router = express.Router();

// get all patient from db
router.get('/',
    Check_Roles(User_Role.SUPER_ADMIN, User_Role.ADMIN),
    Patient_Controller.Get_All_Patient_Controller
);

// get single patient by id from db
router.get('/:id',
    Check_Roles(User_Role.SUPER_ADMIN, User_Role.ADMIN),
    Patient_Controller.Get_Single_Patient_Controller
);

// update patient info
router.patch('/:id',
    // Validation_Request(Patient_Zod_Types.Patient_Update),
    Check_Roles(User_Role.PATIENT,User_Role.SUPER_ADMIN, User_Role.ADMIN),
    Patient_Controller.Update_Patient_Controller
);

// hard delete patient info
router.delete('/:id',
    Check_Roles(User_Role.SUPER_ADMIN, User_Role.ADMIN),
    Patient_Controller.Delete_Patient_Controller
);

// soft delete patient info
router.delete('/soft/:id',
    Check_Roles(User_Role.PATIENT,User_Role.SUPER_ADMIN, User_Role.ADMIN),
    Patient_Controller.Soft_Delete_Patient_Controller
);


export const Patient_Routes = router;