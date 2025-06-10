import { Router } from "express";

import {
<<<<<<< HEAD
    gethotels,
=======
    gethotelsbyapi,
>>>>>>> 63e2c67b1db9c86c85dc62ef2ccd928a9c259a76
} from "../controllers/hotels.controller.js";


const router = Router();

router.route("/:placeid").get(
<<<<<<< HEAD
    gethotels
=======
    gethotelsbyapi
>>>>>>> 63e2c67b1db9c86c85dc62ef2ccd928a9c259a76
);

export default router;