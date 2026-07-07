import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import {
  CreateRoomSchema,
  JoinRoomSchema,
} from "./room.validation.js";

import {
  createRoom,
  joinRoom,
} from "./room.service.js";

export async function createRoomController(
  req: Request,
  res: Response
) {
  const body = CreateRoomSchema.parse(req.body);

  const room = await createRoom(
    body.quizId,
    body.hostId
  );

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Room created successfully",
    data: room,
  });
}

export async function joinRoomController(
  req: Request<{ roomCode: string }>,
  res: Response
) {
  const { roomCode } = req.params;

  const body = JoinRoomSchema.parse(req.body);

  const room = await joinRoom(roomCode, body.nickname);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Joined room successfully",
    data: room,
  });
}