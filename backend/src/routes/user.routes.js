import { Router} from "express";
import { verifyjwt } from "../middleware/auth.middleware";
import { signUp,gsignUp } from "../controllers/user.controller.js";
const router = Router();
router.route("/signup").post(signUp);
router.route("/gsignup").post(gsignUp);
router.post('/login',verifyjwt, login);
router.post('/glogin',verifyjwt, glogin);
export default router;