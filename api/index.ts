import express from "express";
import dotenv from "dotenv";
import { registerDearNadineHttpRoutes } from "../server/dearNadineHttp.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

registerDearNadineHttpRoutes(app);

export default app;
