import { body, param } from "express-validator";

class ExerciseValidator {
  createExerciseValidator(){
    return[
      body("name").isString().notEmpty().withMessage("Name cannot be empty"),
      body("description").isString().isLength({min:2, max:1500}),
      body("exerciseCategoryId").isInt({min:1, max:8}),
      body("exerciseBodyPartId").isInt({min:1, max:10}),
    ]
  };

  getExerciseValidator(){
    return[
      param("exercise_id").notEmpty().withMessage("Provide an exercise_id")
    ]
  }

};

export default new ExerciseValidator();