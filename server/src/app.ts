import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import roomRoutes from "./features/room/room.routes.js";
import quizRoutes from "./features/quiz/quiz.routes.js";
import gameRoutes from "./features/game/game.routes.js";
import aiRoutes from "./features/ai/ai.routes.js";

const app = express();

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/game", gameRoutes);

app.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "API Healthy",
  });
});

app.use("/api/rooms", roomRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/ai", aiRoutes);

export default app;

import { errorMiddleware } from "./common/middleware/error.middleware.js";

// routes...

app.use(errorMiddleware);

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "QuizPulse API 🚀",
    version: "1.0.0",
  });
});