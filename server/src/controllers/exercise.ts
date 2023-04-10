import { Request, Response } from "express";
import { User } from "../models/user.model";
import { Exercise } from "../models/exercise.model";
import { ExerciseBodyPart } from "../models/exercisebodypart.model";
import { ExerciseCategory } from "../models/exercisecategory.model";
import { Op, json } from "sequelize";

// Create exercise for a user
const createExercise = async (req: Request, res: Response) => {
  const user = req.user;
  try {
    const exercise = await Exercise.create({ ...req.body, default: false });
    await user?.$add("exercises", exercise);
    return res.status(201).json({
      message: "Exercise created",
    });
  } catch (err: any) {
    return res.status(400).json({
      message: "Could not create exercise",
    });
  }
};

// Create an exercise for a user
const getExericse = async (req: Request, res: Response) => {
  const exercise_id = req.params.exercise_id;

  Exercise.findOne({
    where: {
      [Op.and]: [{ id: exercise_id, userId: req.user?.id }],
    },
    include: [
      { model: ExerciseBodyPart, as: "exerciseBodyPart" },
      { model: ExerciseCategory, as: "exerciseCategory" },
    ],
  })
    .then((exercise) => {
      return res.status(200).json(exercise);
    })
    .catch(() => {
      return res.status(404).json({
        message: "Exercise does not exist",
      });
    });
};

// Create all exercises for a user
const getAllExercises = async (req: Request, res: Response) => {
  const user = req.user;

  Exercise.findAll({
    where: {
      userId: {
        [Op.or]: {
          [Op.eq]: user?.id,
          [Op.is]: null,
        },
      },
    },
    include: [
      { model: ExerciseBodyPart, as: "exerciseBodyPart" },
      { model: ExerciseCategory, as: "exerciseCategory" },
      { model: User, as: "user" },
    ],
  })
    .then((exercises) => {
      return res.status(200).json(exercises);
    })
    .catch(() => {
      return res.status(404).json({ message: "Exercises do not exist" });
    });
};

// Update an exercise for a user
const updateExercise = async (req: Request, res: Response) => {
  const exercise_id = req.params.exercise_id;
  const user = req.user;

  Exercise.update({ ...req.body }, { where: { [Op.and]: [{ id: exercise_id }, { userId: user?.id }] } }).then(() => {
    return res.status(200).json({ message: "Exercise updated" });
  }).catch(e => {
    console.log(e);
    return res.status(401).json({message: "Failed to update exercise"});
  });
};

// Mark an exercises as deleted for a user
const deleteExercise = async (req: Request, res: Response) => {
  const exercise_id = req.params.exercise_id;
  const user = req.user;
  // Delete exercise only if it belongs to the authenticated user
  Exercise.destroy({ where: { id: exercise_id, userId: user?.id } })
    .then((deleted) => {
      if (deleted === 0) {
        return res.status(200).json({
          message: "No Exercises to delete",
        });
      }
      return res.status(200).json({
        message: "Exercise deleted",
      });
    })
    .catch(() => {
      return res.status(404).json({
        message: "Exercise does not exist or cannot be deleted",
      });
    });
};

export { createExercise, getExericse, getAllExercises, updateExercise, deleteExercise };
