import express from 'express';
import { User_Controllers } from './user.controllers.js';


const router = express.Router();


router.post('/',User_Controllers.Create_User_Admin_Controller);





export const User_Routes = router;