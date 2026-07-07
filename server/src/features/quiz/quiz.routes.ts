import { Router } from "express";

import {
  createQuizController,
  deleteQuizController,
  getAllQuizzesController,
  getQuizByIdController,
  updateQuizController,
} from "./quiz.controller.js";

const router = Router();

router.post("/", createQuizController);

router.get("/", getAllQuizzesController);

router.get("/:id", getQuizByIdController);

router.put("/:id", updateQuizController);

router.delete("/:id", deleteQuizController);

export default router;