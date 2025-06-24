import { Router } from "express";
import { uploadoncloudinary } from "../utils/Cloudinary.js";
import { verifyjwt } from './../middleware/auth.middleware.js';
import { upload } from './../middleware/multer.middleware.js';
import {
    gethotelsbyapi,addHotels,
    gethotelsfromdb,
    getnearestcafes,
    getnearestpublictransport,
    gethotelsbyid
} from "../controllers/hotels.controller.js";


const router = Router();

/*router.route("/:placeid").get(
    gethotelsbyapi
);*/

router.route("/add-hotel").post(
    verifyjwt,
    upload.single("hotel-image"),
    addHotels
)

router.route("/db/:placeid").get(
    gethotelsfromdb
)
router.route("/by-id/:id").get(
    verifyjwt,
    gethotelsbyid
)
router.route("/cafe/:lon/:lat").get(
    getnearestcafes
)

router.route("/public-transport/:lon/:lat").get(
    getnearestpublictransport
)
export default router;