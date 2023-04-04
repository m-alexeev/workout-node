import { DataTypes } from "sequelize";
import { Table, Column, Model, HasMany } from "sequelize-typescript";
import { Exercise } from "./exercise.model";

@Table({ tableName: "exercise_body_parts", timestamps: false })
export class ExerciseBodyPart extends Model {
  @Column({
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataTypes.STRING(128),
    unique: true,
    allowNull: false,
  })
  name: string;

  //Associations
  @HasMany(() => Exercise)
  exercise: Exercise;
}

const populateExerciseBodyParts = async () => {
  await ExerciseBodyPart.bulkCreate([
    {name: "Arms"},
    {name: "Back"},
    {name: "Cardio"},
    {name: "Chest"},
    {name: "Core"},
    {name: "Legs"},
    {name: "Shoulders"},
    {name: "Other"},
    {name: "Olympic"},
    {name: "Full Body"},
  ]);
};

export {populateExerciseBodyParts};