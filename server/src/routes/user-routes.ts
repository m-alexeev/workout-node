import { Router } from "express";
import { login, register } from "../controllers/auth";
import { authenticateUser } from "../middleware/auth-middleware";
import UserValidator from "../validators/user-validator";
import { handleValidationErrors } from "../validators";

const router: Router = Router();

router.route("/auth/verifytoken").get(UserValidator.loginValidator(), handleValidationErrors, authenticateUser);
router.route("/auth/login").post(UserValidator.loginValidator(), handleValidationErrors, login);
router.route("/auth/register").post(UserValidator.registrationValidator(),handleValidationErrors,register);

export default router;
