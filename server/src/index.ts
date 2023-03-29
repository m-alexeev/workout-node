import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { sequelize } from "./models";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (_: Request, res: Response): Response => { return res.json({ message: "Server is running" }) });

const PORT = process.env.SERVER_PORT || 8000;

const start = async (): Promise<void> => {
    try{
        sequelize.sync({force: true}).then(() => {
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