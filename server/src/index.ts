import express from "express";
import dotenv from "dotenv";
import { seedDatabase, sequelize } from "./models";
import userRouter from "./routes/user-routes";
import exerciseRouter from './routes/exercise-routes';

dotenv.config();


const BASE_URL = "/api/v1";
const app = express();

app.use(express.json());

// Routers
app.use(`${BASE_URL}/users`, userRouter);
app.use(`${BASE_URL}/exercises`, exerciseRouter);

const PORT = Number(process.env.SERVER_PORT) || 8080;

const RE_SEED = false;
const start = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: RE_SEED, logging: false });
    if (RE_SEED) await seedDatabase();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
