import dotenv from 'dotenv';
import path from 'path';


dotenv.config({path:path.join(process.cwd(),'.env')});

export default {
    port_number:process.env.PORT,
    environment:process.env.ENVIRONMENT,
    jwt:{
        access_token_secret:process.env.ACCESS_T_SECRET,
        access_token_exp:process.env.ACCESS_T_EXP,
        refresh_token_secret:process.env.REFRESH_T_SECRET,
        refresh_token_exp:process.env.REFRESH_T_EXP
    }
}