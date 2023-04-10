import { body, param } from "express-validator";

class ExerciseValidator {
  createExerciseValidator() {
    return [
      body("name").isString().notEmpty().withMessage("Name cannot be empty"),
      body("description").optional().isString(),
      body("exerciseCategoryId").isInt({ min: 1, max: 8 }),
      body("exerciseBodyPartId").isInt({ min: 1, max: 10 }),
    ];
  }

  getExerciseValidator() {
    return [param("exercise_id").notEmpty().withMessage("Provide an exercise_id")];
  }

  updateExerciseValidator() {
    return [
      param("exercise_id").notEmpty().withMessage("Provide an exericse_id"),
      body("name").optional().isString().isLength({ min: 1 }).withMessage("Name cannot be empty"),
      body("description").optional().isString(),
      body("exerciseCategoryId").optional().isInt({ min: 1, max: 8 }),
      body("exerciseBodyPartId").optional().isInt({ min: 1, max: 10 }),
    ];
  }
}

export default new ExerciseValidator();
