import { Router } from "express";
import { login, register } from "../controllers/auth";
import { authenticateUser } from "../middleware/auth-middleware";

const router: Router = Router();

router.route("/auth/verifytoken").get(authenticateUser);
router.route("/auth/login").post(login);
router.route("/auth/register").post(register);

export default router;
