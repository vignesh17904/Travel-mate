import { Router } from "express";

import {
    gethotelsbyapi,addHotels,
    gethotelsfromdb,
    getnearestcafes,
    getnearestpublictransport
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

router.route("/cafe/:lon/:lat").get(
    getnearestcafes
)

router.route("/public-transport/:lon/:lat").get(
    getnearestpublictransport
)
export default router;