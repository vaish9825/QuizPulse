import { Router } from "express";
import { createQuizController } from "./quiz.controller.js";

const router = Router();

router.post("/", createQuizController);

export default router;