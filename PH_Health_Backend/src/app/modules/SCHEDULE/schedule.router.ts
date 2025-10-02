import express from 'express';
import { Schedule_Controllers } from './schedule.controllers.js';



const router = express.Router();


router.post('/',
    Schedule_Controllers.Create_Schedule_Controller
)


export const Schedule_Routes = router;