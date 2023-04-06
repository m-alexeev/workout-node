import { Request, Response } from "express";
import dotenv from "dotenv";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import { UserStatistics } from "../models/userstatistics.model";
import { Login, LoginResponse, Register, RegisterResponse } from "@workout/types";

dotenv.config();

const generateAccessToken = (email: string) => {
  return jwt.sign({ data: email }, process.env.TOKEN_SECRET as string, {
    expiresIn: 60 * 60,
  });
};


const login = async (req: Request, res: Response<LoginResponse>) => {
  const { email, password } = req.body;
  
  // Find user by email and create a token if user exists
  User.findOne({ where: { email: email } }).then((user) => {
    let error: boolean = false;
    if (user === null) {
      error = true;
    } else {
      error = !user.validatePassword(password);
    }
    if (error) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    const token: string = generateAccessToken(email);
    const response: Login = { token: token };
    return res.status(201).json(response);
  });
};

const register = async (req: Request, res: Response<RegisterResponse>) => {
  const { email, password, first_name, last_name, height, weight, fat_percent } = req.body;

  User.create(
    {
      email: email,
      password: password,
      first_name: first_name,
      last_name: last_name,
      statistics: {
        height: height,
        weight: weight,
        fat_percent: fat_percent,
      },
    },
    { include: [UserStatistics] }
  )
    .then(() => {
      const response: Register = { message: "Account Created" };
      return res.status(201).json(response);
    })
    .catch((err) => {
      const error_messages = err.errors.map((error: any) => {
        return error.message;
      });
      return res.status(400).json({ message: error_messages[0] });
    });
};

export { login, register };
