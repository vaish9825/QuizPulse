import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { generateQuiz } from "./ai.service.js";
import { Quiz } from "../quiz/quiz.model.js";

export async function generateQuizController(
  req: Request,
  res: Response
) {
  try {
    const generatedQuiz =
      await generateQuiz(req.body);

    const quiz =
      await Quiz.create({
        ...generatedQuiz,

        createdBy: "AI",
        source: "ai",
      });

    return res
      .status(StatusCodes.CREATED)
      .json({
        success: true,
        quiz,
      });
  } catch (error) {
    return res
      .status(
        StatusCodes.INTERNAL_SERVER_ERROR
      )
      .json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Quiz generation failed",
      });
  }
}