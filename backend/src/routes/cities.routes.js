import { Router } from "express";

import {
    createcity,
    getcities,
    getPlaceIdByCityName
} from "../controllers/cities.controller.js";


const router = Router();

router.route("/create-city").post(
    createcity
);

router.route("/get-all-cities").get(
    getcities
)

router.route("/get-placeid/:name").get(
    getPlaceIdByCityName
)
export default router;