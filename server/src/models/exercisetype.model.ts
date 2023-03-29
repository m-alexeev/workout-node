import { DataTypes, Optional } from "sequelize";
import { Table, Column, Model, HasMany } from "sequelize-typescript";
import { Exercise } from "./exercise.model";


@Table({ tableName: "exercise_types", timestamps: false })
export class ExerciseType extends Model {
    @Column({
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
    })
    id: number

    @Column({
        type: DataTypes.STRING(128),
        unique: true,
        allowNull: false,
    })
    name: string

    //Associations 
    @HasMany(() => Exercise)
    exercise: Exercise;
};
