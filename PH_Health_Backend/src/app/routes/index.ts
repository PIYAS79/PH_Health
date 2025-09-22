import express from 'express'
import { User_Routes } from '../modules/USER/user.router.js';
import { Admin_Routes } from '../modules/ADMIN/admin.router.js';
import { Auth_Routes } from '../modules/AUTH/auth.router.js';


const router = express.Router();

const project_Routes = [
    {
        path : '/user',
        route : User_Routes
    },{
        path : '/admin',
        route : Admin_Routes
    },{
        path : '/auth',
        route : Auth_Routes
    }
]

project_Routes.forEach((one)=>router.use(one.path,one.route));
export const Project_Final_Routes = router;