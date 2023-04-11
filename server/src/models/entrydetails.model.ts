import { DataTypes } from "sequelize";
import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { WorkoutEntry } from "./workoutentry.model";

@Table({ tableName: "entry_details" })
export class EntryDetails extends Model {
  @Column({
    primaryKey: true,
    type: DataTypes.BIGINT,
    autoIncrement: true,
  })
  id: bigint;

  @Column({ type: DataTypes.INTEGER, allowNull: false })
  set_number: number;

  @Column({ type: DataTypes.BIGINT, allowNull: true })
  reps: number;

  @Column({ type: DataTypes.DECIMAL, allowNull: true })
  weight: number;

  @ForeignKey(() => WorkoutEntry)
  workoutEntryId: bigint;

  // Associations
  @BelongsTo(() => WorkoutEntry)
  workoutEntry: WorkoutEntry;
}
