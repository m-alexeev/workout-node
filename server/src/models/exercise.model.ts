import { DataTypes, Optional } from "sequelize";
import { BelongsTo, Column, Default, ForeignKey, Model, Table } from "sequelize-typescript";
import { ExerciseType } from "./exercisetype.model";
import { MachineType } from "./machinetype.model";

interface ExerciseAttributes { 
    id: bigint; 
    name: string; 
    description: string;
    machineTypeId: number;
    exerciseTypeId: number;
    default: boolean;
}

interface ExerciseCreationAttributes extends Optional<ExerciseAttributes, "id">{}

@Table({tableName: "exercises"})
export class Exercise extends Model<ExerciseAttributes, ExerciseCreationAttributes> {
    @Column({
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
    })
    id: bigint

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

    @ForeignKey(() => ExerciseType)
    @Column
    exerciseTypeId: number;

    @ForeignKey(() => MachineType)
    @Column
    machineTypeId: number;

    @Default(true)
    @Column({
        allowNull: false
    })
    default: boolean;

    // Associations
    @BelongsTo(() => ExerciseType)
    exerciseType: ExerciseType

    @BelongsTo(() => MachineType)
    machineType: MachineType

}