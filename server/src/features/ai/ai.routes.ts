import { Router } from "express";

import { generateQuizController } from "./ai.controller.js";

const router = Router();

router.post(
  "/generate/topic",
  generateQuizController
);

export default router;