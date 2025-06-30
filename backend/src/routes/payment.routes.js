import {createcheckoutSession} from "../controllers/payment.controller.js";
import { Router } from "express";

const router = Router();
router.post("/create-checkout-session", createcheckoutSession);
export default router;