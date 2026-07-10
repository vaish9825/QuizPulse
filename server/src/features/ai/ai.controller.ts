import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { generateQuiz } from "./ai.service.js";
import { Quiz } from "../quiz/quiz.model.js";

export async function generateQuizController(
  req: Request,
  res: Response
) {
  try {
    const generatedQuiz = await generateQuiz(
      req.body
    );

    const quiz = await Quiz.create({
      ...generatedQuiz,
      createdBy: "AI",
      source: "ai",
    });

    return res.status(
      StatusCodes.CREATED
    ).json({
      success: true,
      quiz,
    });

  } catch (error: any) {

    console.error(
      "AI Controller Error:"
    );
    console.error(error);

    // Gemini temporarily unavailable
    if (error?.status === 503) {
      return res.status(503).json({
        success: false,
        message:
          "The AI service is currently experiencing high demand. Please try again in a few moments.",
      });
    }

    // Gemini quota exceeded
    if (error?.status === 429) {
      return res.status(429).json({
        success: false,
        message:
          "AI quota exceeded. Please try again later.",
      });
    }

    // Invalid JSON returned by Gemini
    if (
      error instanceof Error &&
      error.message.includes("invalid JSON")
    ) {
      return res.status(500).json({
        success: false,
        message:
          "The AI returned an invalid response. Please try again.",
      });
    }

    // Any other error
    return res.status(
      StatusCodes.INTERNAL_SERVER_ERROR
    ).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Quiz generation failed.",
    });
  }
}