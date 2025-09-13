import express from 'express';
import { Admin_Controllers } from './admin.controllers.js';



const router = express.Router();


router.get('/',Admin_Controllers.Get_All_Admin_Controller);





export const Admin_Routes = router;