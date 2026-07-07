import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  createQuiz,
  deleteQuiz,
  getAllQuizzes,
  getQuizById,
  updateQuiz,
} from "./quiz.service.js";

import {
  CreateQuizSchema,
  UpdateQuizSchema,
} from "./quiz.validation.js";

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

export async function getAllQuizzesController(
  _req: Request,
  res: Response
) {
  const quizzes = await getAllQuizzes();

  res.json({
    success: true,
    data: quizzes,
  });
}

export async function getQuizByIdController(
  req: Request,
  res: Response
) {
const quiz = await getQuizById(req.params.id as string);

  if (!quiz) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: "Quiz not found",
    });
  }

  res.json({
    success: true,
    data: quiz,
  });
}

export async function updateQuizController(
  req: Request,
  res: Response
) {
  const body = UpdateQuizSchema.parse(req.body);

  const quiz = await updateQuiz(req.params.id as string, body);

  if (!quiz) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: "Quiz not found",
    });
  }

  res.json({
    success: true,
    message: "Quiz updated successfully",
    data: quiz,
  });
}

export async function deleteQuizController(
  req: Request,
  res: Response
) {
  const quiz = await deleteQuiz(req.params.id as string);

  if (!quiz) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: "Quiz not found",
    });
  }

  res.json({
    success: true,
    message: "Quiz deleted successfully",
  });
}