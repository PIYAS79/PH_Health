import express from 'express';
import Validation_Request from '../../utils/request.validation.js';
import { Auth_Controller } from './auth.controllers.js';
import { Auth_Zod_Types } from './auth.zod.js';


const router = express.Router();


router.post('/login',Validation_Request(Auth_Zod_Types.Login),Auth_Controller.Login_Controller);
router.post('/refresh-token',Auth_Controller.Fetch_Refresh_Token_Controller);




export const Auth_Routes = router;