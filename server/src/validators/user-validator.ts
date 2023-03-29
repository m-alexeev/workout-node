import { IsInt, IsEmail, IsStrongPassword, IsString, Length, IsBoolean, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { BaseValidator } from ".";

class UserValidator extends BaseValidator{
    @IsOptional()
    @IsInt()
    id?: bigint;

    @IsEmail(undefined, {groups: ['login', 'registration']})
    email: string;

    @IsString()
    @Length(2, 50, {groups: ["registration"]})
    first_name: string;
    
    @IsString()
    @Length(2, 50, {groups: ["registration"]})
    last_name: string;

    @IsStrongPassword(undefined, {groups: ['registration']})
    @IsNotEmpty({groups: ["login", "registration"]})
    password: string;

    @IsBoolean()
    active?: boolean;
}

class UserStatisticsValidator extends BaseValidator{
    @IsOptional()
    @IsInt()
    id: bigint

    @IsOptional()
    @IsNumber()
    height: number

    @IsOptional()
    @IsNumber()
    weight: number
    
    @IsOptional()
    @IsNumber()
    fat_percent: number
}

export {UserValidator, UserStatisticsValidator};