import { DataTypes, Optional } from "sequelize";
import { Table, Column, Model,IsEmail, Default, BeforeCreate, HasMany } from "sequelize-typescript";
import bcrypt from "bcrypt";
import { UserStatistics } from "./userstatistics.model";
import { Exercise } from "./exercise.model";
import { Workout } from "./workout.model";


@Table({ tableName: 'users' })
export class User extends Model{
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

    // Associations 
    @HasMany(() => UserStatistics)
    statistics: UserStatistics[];

    @HasMany(() => Exercise)
    exercises: Exercise[];

    @HasMany(() => Workout)
    workouts: Workout[];

    //Hooks 
    @BeforeCreate
    static hashPassword(user: User){
        if (user.password){
            const salt = bcrypt.genSaltSync(10);
            user.password = bcrypt.hashSync(user.password, salt);
        }
    }

    @BeforeCreate
    static emailLowercase(user: User){
        if (user.email){
            user.email = user.email.toLowerCase();
        }
    }

    // Additional Functions
    validatePassword(password: string): boolean{
        return bcrypt.compareSync(password, this.password);
    }
}