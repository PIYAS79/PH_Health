import express, { type Application, type NextFunction, type Request, type Response } from 'express';
import cors from 'cors';
import httpStatus from 'http-status';
import Global_Error_Handler from './errors/globalErrorHandler.js';
import { Project_Final_Routes } from './routes/index.js';
import Route_Not_Found_Error from './errors/routeNotFound.js';


const app:Application = express();


app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors());


app.use('/app/v1',Project_Final_Routes);


app.get('/',(req:Request,res:Response)=>{
    res.status(httpStatus.OK).json({
        success:true,
        message: "Server is running successfully !"
    })
})

app.use(Route_Not_Found_Error);

app.use(Global_Error_Handler);


export default app;