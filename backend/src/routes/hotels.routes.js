import { Router } from "express";

import {
    gethotelsbyapi,addHotels
} from "../controllers/hotels.controller.js";


const router = Router();

router.route("/:placeid").get(
    gethotelsbyapi
);

router.route("/add-hotel").post(
    addHotels
)
export default router;