import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { sequelize } from "./models";
import userRouter from "./routes/user-routes";

dotenv.config();

const BASE_URL = "/api/v1";
const app = express();

app.use(express.json());



// Routers 
app.use(`${BASE_URL}/users`,userRouter);


const PORT = process.env.SERVER_PORT || 8000;

const start = async (): Promise<void> => {
    try{
        sequelize.sync({force: false, logging: false}).then(() => {
            app.listen(PORT, () => {
                console.log(`Server is running on http://localhost:${PORT}`);
            });
        });
    }catch (error) {
        console.error(error);
        process.exit(1);
    }
}

start(); 