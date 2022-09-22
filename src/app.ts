import express from "express";
import "express-async-errors";
import cors from "cors";

import { validationErrorMiddleware } from "./lib/validation";

import planetsRoutes from "./routes/planets";

const corsOption = {
    origin: "http://localhost:8080",
};

const app = express();

app.use(express.json());

app.use(cors(corsOption));

app.use("/planets", planetsRoutes);

app.use(validationErrorMiddleware);

export default app;

