import  express  from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


import touristrouter from './routes/touristplaces.routes.js';
app.use('/api/tourist', touristrouter);

import hotelrouter from './routes/hotels.routes.js';
app.use('/api/hotels', hotelrouter);
<<<<<<< HEAD
=======


import userRouter from './routes/user.routes.js';
app.use("/api/v1/users",userRouter)
>>>>>>> 63e2c67b1db9c86c85dc62ef2ccd928a9c259a76
export {app};