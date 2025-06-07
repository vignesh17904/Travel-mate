import { Router } from "express";

import {
    gethotels,
} from "../controllers/hotels.controller.js";


const router = Router();

router.route("/:placeid").get(
    gethotels
);

export default router;