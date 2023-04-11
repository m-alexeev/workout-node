import { DataTypes } from "sequelize";
import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Exercise } from "./exercise.model";


@Table({tableName: "workout_entries"})
export class WorkoutEntry extends Model {
  @Column({
    primaryKey: true,
    type: DataTypes.BIGINT,
    autoIncrement: true,
  })
  id?: bigint;

  @ForeignKey(() => Exercise)
  exerciseId: bigint;

  @BelongsTo(() => Exercise)
  exercise: Exercise;
}
