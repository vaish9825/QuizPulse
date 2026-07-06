import express from "express";
import cors from "cors";

import { env } from "./config/env.js";
import roomRoutes from "./features/room/room.routes.js";

const app = express();

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "API Healthy",
  });
});

// 👇 THIS IS THE IMPORTANT LINE
app.use("/api/rooms", roomRoutes);

export default app;

import { errorMiddleware } from "./common/middleware/error.middleware.js";

// routes...

app.use(errorMiddleware);