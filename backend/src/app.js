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

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

import touristrouter from './routes/touristplaces.routes.js';
app.use('/api/tourist', touristrouter);

import hotelrouter from './routes/hotels.routes.js';
app.use('/api/hotels', hotelrouter);

import userRouter from './routes/user.routes.js';
app.use("/api/users",userRouter)

import cityrouter from './routes/cities.routes.js';
app.use("/api/cities",cityrouter)

import bookingRoutes from "./routes/bookings.routes.js";
app.use("/api/bookings", bookingRoutes);

import paymentRoutes from "./routes/payment.routes.js";
app.use("/api/payment", paymentRoutes);
export {app};