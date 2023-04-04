import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { populateExerciseBodyParts } from "./exercisebodypart.model";
import { populateExerciseCategories } from "./exercisecategory.model";
import { populateExercises } from "./exercise.model";

dotenv.config();


const sequelize = new Sequelize({
    database: process.env.DB_DATABASE,
    dialect: "postgres",
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    models: [__dirname + "/**/*.model.ts"],
    modelMatch: (filename, member) => {
        return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
    },
    pool: {
        min: 0, 
        max: 5,
        acquire: 30000, 
        idle: 10000,
    }
});


const seedDatabase = async () => {
    await populateExerciseBodyParts();
    await populateExerciseCategories();
    await populateExercises();
};

export {sequelize, seedDatabase}

