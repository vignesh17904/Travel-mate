import express from "express";
import { createBooking, getBookingsByUser, getBookingsByOwner } from "../controllers/bookings.controller.js";
import { verifyjwt } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/makebooking", verifyjwt, createBooking);
router.get("/my", verifyjwt, getBookingsByUser);
router.get("/owner", verifyjwt, getBookingsByOwner);

export default router;
