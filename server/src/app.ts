import express from "express";
import roomRoutes from "./features/room/room.routes.js";

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
  res.send("QuizPulse API 🚀");
});

app.use("/api/rooms", roomRoutes);

export default app;