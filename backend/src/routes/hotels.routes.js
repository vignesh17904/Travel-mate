import { Router } from "express";

import {
    gethotelsbyapi,addHotels,
    gethotelsfromdb
} from "../controllers/hotels.controller.js";


const router = Router();

router.route("/:placeid").get(
    gethotelsbyapi
);

router.route("/add-hotel").post(
    addHotels
)

router.route("/db/:placeid").get(
    gethotelsfromdb
)
export default router;