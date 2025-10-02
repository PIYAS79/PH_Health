import express from 'express'
import { User_Routes } from '../modules/USER/user.router.js';
import { Admin_Routes } from '../modules/ADMIN/admin.router.js';
import { Auth_Routes } from '../modules/AUTH/auth.router.js';
import { Specialties_Routes } from '../modules/SPECIALTIES/specialties.router.js';
import { Doctor_Routes } from '../modules/DOCTOR/doctor.router.js';
import { Patient_Routes } from '../modules/PATIENT/patient.router.js';
import { Schedule_Routes } from '../modules/SCHEDULE/schedule.router.js';


const router = express.Router();

const project_Routes = [
    {
        path: '/user',
        route: User_Routes
    }, {
        path: '/admin',
        route: Admin_Routes
    }, {
        path: '/auth',
        route: Auth_Routes
    }, {
        path: '/specialties',
        route: Specialties_Routes
    }, {
        path: '/doctor',
        route: Doctor_Routes
    }, {
        path: '/patient',
        route: Patient_Routes
    }, {
        path: '/schedule',
        route: Schedule_Routes
    }
]

project_Routes.forEach((one) => router.use(one.path, one.route));
export const Project_Final_Routes = router;