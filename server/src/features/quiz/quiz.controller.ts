import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { createQuiz } from "./quiz.service.js";
import { CreateQuizSchema } from "./quiz.validation.js";

export async function createQuizController(
  req: Request,
  res: Response
) {
  const body = CreateQuizSchema.parse(req.body);

  const quiz = await createQuiz(body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Quiz created successfully",
    data: quiz,
  });
}