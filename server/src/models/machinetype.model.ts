import { DataTypes, Optional } from "sequelize";
import { Table, Column, Model } from "sequelize-typescript";

interface MachineTypeAttributes {
    id: number;
    name: string;
}

interface MachineTypeCreationAttributes extends Optional<MachineTypeAttributes, "id"> { }

@Table({ tableName: "machine_types", timestamps:false })
export class MachineType extends Model<MachineTypeAttributes, MachineTypeCreationAttributes> {
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
