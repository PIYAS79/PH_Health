import express from 'express'
import { User_Routes } from '../modules/USER/user.router.js';
import { Admin_Routes } from '../modules/ADMIN/admin.router.js';


const router = express.Router();

const project_Routes = [
    {
        path : '/user',
        route : User_Routes
    },{
        path : '/admin',
        route : Admin_Routes
    }
]

project_Routes.forEach((one)=>router.use(one.path,one.route));
export const Project_Final_Routes = router;