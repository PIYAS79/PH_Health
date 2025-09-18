import express from 'express';
import { Admin_Controllers } from './admin.controllers.js';



const router = express.Router();

// get all admin from db
router.get('/',Admin_Controllers.Get_All_Admin_Controller);

// get single admin by id from db
router.get('/:id',Admin_Controllers.Get_Single_Admin_By_Id_Controller);

// update admin route
router.patch('/:id',Admin_Controllers.Update_Admin_Data_Controller);

// delete admin and user data 
router.delete('/:id',Admin_Controllers.Delete_Admin_and_User_Controller);

// soft delete admin and user data 
router.delete('/soft/:id',Admin_Controllers.Soft_Delete_Admin_and_User_Controller);


export const Admin_Routes = router;