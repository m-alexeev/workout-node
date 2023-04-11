import { DataTypes } from "sequelize";
import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./user.model";

@Table({tableName: "workouts"})
export class Workout extends Model{
  @Column({
    primaryKey: true,
    type: DataTypes.BIGINT,
    autoIncrement: true,
  })
  id: bigint;

  @Column({type: DataTypes.STRING})
  title: string;

  @Column({type: DataTypes.DATE, allowNull:false})
  start_time: Date;

  @Column({type: DataTypes.DATE, allowNull: false})
  end_time: Date;

  @Column({type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false})
  template: boolean;

  @ForeignKey(() => User)
  userId: bigint

  @BelongsTo(() => User)
  user: User
}