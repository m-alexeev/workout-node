import { DataTypes, Optional } from "sequelize";
import { Table, Column, Model } from "sequelize-typescript";

interface ExerciseTypeAttributes {
    id: number;
    name: string;
}

interface ExerciseTypeCreationAttributes extends Optional<ExerciseTypeAttributes, "id"> { }

@Table({ tableName: "exercise_types", timestamps: false })
export class ExerciseType extends Model<ExerciseTypeAttributes, ExerciseTypeCreationAttributes> {
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
};
