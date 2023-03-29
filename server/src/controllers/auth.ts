import { Request, Response } from "express";
import dotenv from "dotenv";
import { UserStatisticsValidator, UserValidator } from "../validators/user-validator";
import { validate, ValidationError } from "class-validator";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import { ValidationErrorObj, ValidationErrorSimple } from "../types/validation";
import { UserStatistics } from "../models/userstatistics.model";
import { BaseValidator } from "../validators";


dotenv.config();

const generateAccessToken = (email: string) => {
    return jwt.sign({ data: email }, process.env.TOKEN_SECRET as string, {
        expiresIn: 60 * 60,
    });
}

const createErrorObject = async (validator: BaseValidator, groups?: string[]): Promise<ValidationErrorObj> => {
    const errorObj: ValidationErrorObj = { valid: true, errors: [] as ValidationErrorSimple[] };
    const errors: ValidationError[] = await validate(validator, {
        groups: groups
    });
    if (errors.length > 0) {
        const field_errors = errors.map((error) => {
            return {
                field: error.property,
                errors: error.constraints
            } as ValidationErrorSimple;
        });
        errorObj.valid = false;
        errorObj.errors = field_errors;
    }
    return errorObj;
}

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userValidator: UserValidator = new UserValidator();
    userValidator.email = email;
    userValidator.password = password;

    const { valid, errors } = await createErrorObject(userValidator, ['login']);
    if (!valid) {
        return res.status(400).json(errors);
    }

    // Find user by email and create a token if user exists
    User.findOne({ where: { email: email } }).then((user) => {
        let error: boolean = false
        if (user === null) {
            error = true;
        } else {
            error = !user.validatePassword(password);
        }
        if (error) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }
        const token: string = generateAccessToken(email);
        return res.status(201).json({
            token: token
        })
    });

}

const register = async (req: Request, res: Response) => {
    const { email, password, first_name, last_name, height, weight, fat_percent } = req.body;
    console.log(email, password, first_name, last_name, height, weight, fat_percent);

    const userValidator: UserValidator = new UserValidator();
    userValidator.email = email;
    userValidator.first_name = first_name;
    userValidator.last_name = last_name;
    userValidator.password = password;

    const userStatsValidator: UserStatisticsValidator = new UserStatisticsValidator();
    userStatsValidator.weight = weight;
    userStatsValidator.height = height;
    userStatsValidator.fat_percent = fat_percent;

    const { valid: stats_valid, errors: stats_errors } = await createErrorObject(userStatsValidator);
    const { valid: user_valid, errors: user_errors } = await createErrorObject(userValidator, ['registration']);
    if (!stats_valid || !user_valid) {
        return res.status(400).json({
            user_errors: user_errors,
            stats_errors: stats_errors
        });
    }

    User.create({
        email: email,
        password: password,
        first_name: first_name,
        last_name: last_name,
        statistics: {
            height: height,
            weight: weight,
            fat_percent: fat_percent,
        }
    }, { include: [UserStatistics] }).then(() => {
        const token: string = generateAccessToken(email);
        return res.status(201).json({
            token: token
        });
    }).catch((err) => {
        const error_messages = err.errors.map((error: any) => { return error.message});
        return res.status(400).json({ message: error_messages[0]});
    })

}

export { login, register }