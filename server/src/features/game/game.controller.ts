import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import {
  getCurrentQuestion,
} from "./game.service.js";

export async function getCurrentQuestionController(
  req: Request<{ roomCode: string }>,
  res: Response
) {
  const question =
    await getCurrentQuestion(
      req.params.roomCode
    );

  res.status(StatusCodes.OK).json({
    success: true,
    data: question,
  });
}