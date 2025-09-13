import express from 'express';
import { User_Controllers } from './user.controllers.js';


const router = express.Router();


router.post('/',User_Controllers.Get_All_User_Controller);





export const User_Routes = router;