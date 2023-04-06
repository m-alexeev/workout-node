import { Request, Response } from "express";
import { User } from "../models/user.model";
import { Exercise } from "../models/exercise.model";
import { ExerciseBodyPart } from "../models/exercisebodypart.model";
import { ExerciseCategory } from "../models/exercisecategory.model";
import { Op } from "sequelize";

// Create exercise for a user
const createExercise = async (req: Request, res: Response) => {
  const req_user = req.user;
  console.log(req_user?.data);
  User.findOne({ where: { email: req_user?.data } })
    .then(async (user) => {
      try {
        const exercise = await Exercise.create({ ...req.body });
        await user?.$add("exercises", exercise);
        return res.status(201).json({
          message: "Exercise created",
        });
      } catch (err: any) {
        return res.status(400).json({
          message: "Could not create exercise",
        });
      }
    })
    .catch(() => {
      return res.status(404).json({
        message: "User does not exist",
      });
    });
};

// Create an exercise for a user
const getExericse = async (req: Request, res: Response) => {
  const exercise_id = req.params.exercise_id;

  Exercise.findByPk(exercise_id, {
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
  const req_user = req.user;
  const user = await User.findOne({ where: { email: req_user?.data } });
  if (user === null) {
    return res.status(404).json({
      message: "User does not exist",
    });
  }

  Exercise.findAll({
    where: {
      userId: {
        [Op.or]: {
          [Op.eq]: user.id,
          [Op.is]: null,
        },
      },
    },
  }).then((exercises => {
    return res.status(200).json(exercises)
  })).catch(() => {
    return res.status(404).json({message:"Exercises do not exist"})
  }) ;
};

// Update an exercise for a user
const updateExercise = async (req: Request, res: Response) => {};

// Mark an exercises as deleted for a user
const deleteExercise = async (req: Request, res: Response) => {};

export { createExercise, getExericse, getAllExercises, updateExercise, deleteExercise };
