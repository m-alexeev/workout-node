import { DataTypes, Optional } from "sequelize";
import { Table, Column, Model, Is, IsEmail, Default } from "sequelize-typescript";

interface UserAttributes {
    id: bigint;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    active: boolean
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'active'> { }

@Table({ tableName: 'users' })
export class User extends Model<UserAttributes, UserCreationAttributes>{
    @Column({
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
    })
    id: bigint;

    @Column({
        type: DataTypes.STRING(256),
        allowNull: false,
    })
    first_name: string;

    @Column({
        type: DataTypes.STRING(256),
        allowNull: false,
    })
    last_name: string;

    @IsEmail
    @Column({
        type: DataTypes.STRING(256),
        allowNull: false,
        unique: true,
    })
    email: string;

    @Column({
        type: DataTypes.STRING(128),
        allowNull: false,
    })
    password: string;

    @Default(false)
    @Column({
        type: DataTypes.BOOLEAN,
    })
    active: boolean;
}