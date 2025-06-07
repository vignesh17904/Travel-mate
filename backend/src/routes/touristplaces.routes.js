import { Router } from "express";

import {
    gettouristplaces,
} from "../controllers/touristplace.controller.js";

const router = Router();

router.route("/:placeid").get(
    gettouristplaces
);

export default router;