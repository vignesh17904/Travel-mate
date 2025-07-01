import express from "express";
import { createBooking, getBookingsByUser, getBookingsByOwner,updateBookingPaymentStatus,cancelBooking } from "../controllers/bookings.controller.js";
import { verifyjwt } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/makebooking", verifyjwt, createBooking);
router.get("/my", verifyjwt, getBookingsByUser);
router.get("/owner", verifyjwt, getBookingsByOwner);
router.post("/update-status", updateBookingPaymentStatus);
router.post("/cancel-booking", cancelBooking);
export default router;
