import { DataTypes, Optional } from "sequelize";
import { BelongsTo, Column, Default, DefaultScope, ForeignKey, Model, Scopes, Table } from "sequelize-typescript";
import { ExerciseCategory } from "./exercisecategory.model";
import { ExerciseBodyPart } from "./exercisebodypart.model";
import { User } from "./user.model";

@DefaultScope(() => ({
  attributes: {exclude: ['exerciseCategoryId', 'exerciseBodyPartId', 'userId']}
}))
@Table({ tableName: "exercises" })
export class Exercise extends Model {
  @Column({
    primaryKey: true,
    type: DataTypes.BIGINT,
    autoIncrement: true,
  })
  id: bigint;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataTypes.TEXT,
    allowNull: true,
  })
  description: string;

  @ForeignKey(() => ExerciseCategory)
  @Column({
    allowNull: false,
  })
  exerciseCategoryId: number;

  @ForeignKey(() => ExerciseBodyPart)
  @Column({
    allowNull: false,
  })
  exerciseBodyPartId: number;

  @ForeignKey(() => User)
  @Column({
    allowNull: true,
  })
  userId: bigint

  @Default(true)
  @Column({
    allowNull: false,
    defaultValue: true,
  })
  default: boolean;

  // Associations
  @BelongsTo(() => ExerciseCategory)
  exerciseCategory: ExerciseCategory;

  @BelongsTo(() => ExerciseBodyPart)
  exerciseBodyPart: ExerciseBodyPart;

  @BelongsTo(() => User)
  user: User
}

const populateExercises = async () => {
  await Exercise.bulkCreate([
    { name: "Bicep Curl", exerciseCategoryId: 1, exerciseBodyPartId: 2 },
    { name: "Tricep Extension", exerciseCategoryId: 1, exerciseBodyPartId: 3 },
    { name: "Reverse Fly", exerciseCategoryId: 2, exerciseBodyPartId: 2 },
    { name: "Reverse Fly", exerciseCategoryId: 2, exerciseBodyPartId: 3 },
    { name: "Lateral Raise", exerciseCategoryId: 7, exerciseBodyPartId: 2 },
    { name: "Strict Military Press", exerciseCategoryId: 7, exerciseBodyPartId: 1 },
    { name: "Plank", exerciseCategoryId: 5, exerciseBodyPartId: 7 },
    { name: "Standing Calf Raise", exerciseCategoryId: 6, exerciseBodyPartId: 2 },
    { name: "Leg Extension", exerciseCategoryId: 6, exerciseBodyPartId: 3 },
    { name: "Lunge", exerciseCategoryId: 6, exerciseBodyPartId: 2 },
    { name: "Arnold Press", exerciseCategoryId: 7, exerciseBodyPartId: 2 },
  ]);
};

export { populateExercises };
