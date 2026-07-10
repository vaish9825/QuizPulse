import { Request, Response } from "express";

import { Quiz } from "../quiz/quiz.model.js";

import { extractPdfText } from "./pdf.helper.js";
import { generateQuizFromPdf } from "./pdf.service.js";

export async function uploadPdf(
  req: Request,
  res: Response
) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No PDF uploaded",
      });
    }

    const difficulty =
      (req.body.difficulty as string) ??
      "easy";

    const questions =
      Number(req.body.questions) || 10;

    // Extract text from PDF
    const text = await extractPdfText(
      req.file.buffer
    );

    // Generate quiz (already returns a parsed object)
    const generatedQuiz =
      await generateQuizFromPdf(
        text,
        difficulty,
        questions
      );

    // Save to MongoDB
    const quiz = await Quiz.create({
      ...generatedQuiz,
      createdBy: "AI",
      source: "ai",
    });

    return res.status(201).json({
      success: true,
      quiz,
    });

  } catch (error: any) {

    console.error(
      "PDF Controller Error:"
    );
    console.error(error);

    if (error?.status === 503) {
      return res.status(503).json({
        success: false,
        message:
          "The AI service is currently busy. Please try again in a few moments.",
      });
    }

    if (error?.status === 429) {
      return res.status(429).json({
        success: false,
        message:
          "AI quota exceeded. Please try again later.",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to generate quiz",
    });
  }
}