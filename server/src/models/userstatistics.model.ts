import { DataTypes, Optional } from "sequelize";
import { Column, Table, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./user.model";


@Table({tableName: "user_statistics"})
export class UserStatistics extends Model{
    @Column({
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
    })
    id: bigint;

    @Column({
        type: DataTypes.DECIMAL,
        allowNull: true,
    })
    height: number;

    @Column({
        type: DataTypes.DECIMAL,
        allowNull: true,
    })
    weight: number;

    @Column({
        type: DataTypes.DECIMAL,
        allowNull: true,
    })
    fat_percent: number;

    @ForeignKey(() => User)
    @Column
    userId: bigint;

    // Associations 
    @BelongsTo(() => User)
    user: User

}