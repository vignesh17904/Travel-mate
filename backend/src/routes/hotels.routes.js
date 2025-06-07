import { Router } from "express";

import {
    gethotelsbyapi,
} from "../controllers/hotels.controller.js";


const router = Router();

router.route("/:placeid").get(
    gethotelsbyapi
);

export default router;