import { DataTypes } from "sequelize";
import { Table, Column, Model, HasMany } from "sequelize-typescript";
import { Exercise } from "./exercise.model";


@Table({ tableName: "exercise_categories", timestamps: false })
export class ExerciseCategory extends Model {
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

const populateExerciseCategories = async() => {
    await ExerciseCategory.bulkCreate([
        {name: "Barbell"},
        {name: "Dumbbell"},
        {name: "Machine"},
        {name: "Weighted Bodyweight"},
        {name: "Assisted Bodyweight"},
        {name: "Reps Only"},
        {name: "Cardio"},
        {name: "Duration"},
    ]);
}

export {populateExerciseCategories}
