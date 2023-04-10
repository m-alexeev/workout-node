import { Router } from "express";
import { authenticateUser } from "../middleware/auth-middleware";
import { createExercise, deleteExercise, getAllExercises, getExericse, updateExercise } from "../controllers/exercise";
import ExerciseValidator from "../validators/exercise-validator";
import { handleValidationErrors } from "../validators";

const router: Router = Router();

router
  .route("/")
  .get(authenticateUser, getAllExercises)
  .post(authenticateUser, ExerciseValidator.createExerciseValidator(), handleValidationErrors, createExercise);

router
  .route("/:exercise_id")
  .get(authenticateUser, ExerciseValidator.getExerciseValidator(), handleValidationErrors, getExericse)
  .put(authenticateUser, ExerciseValidator.updateExerciseValidator(), handleValidationErrors, updateExercise)
  .delete(authenticateUser, ExerciseValidator.getExerciseValidator(), handleValidationErrors, deleteExercise);

export default router;
