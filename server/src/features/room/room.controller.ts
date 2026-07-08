import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import {
  CreateRoomSchema,
  JoinRoomSchema,
} from "./room.validation.js";

import {
  createRoom,
  joinRoom,
  getRoom,
} from "./room.service.js";

export async function createRoomController(
  req: Request,
  res: Response
) {
  try {
    const body = CreateRoomSchema.parse(req.body);

    const room = await createRoom(
      body.quizId,
      body.hostId || "demo-host"
    );

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Room created successfully",
      data: room,
    });
  } catch (error) {
    console.error("CREATE ROOM ERROR:", error);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Internal Server Error",
    });
  }
}

export async function joinRoomController(
  req: Request<{ roomCode: string }>,
  res: Response
) {
  try {
    const { roomCode } = req.params;

    const body = JoinRoomSchema.parse(req.body);

    const result = await joinRoom(
      roomCode,
      body.nickname
    );

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Joined room successfully",
      data: result,
    });
  } catch (error) {
    console.error("JOIN ROOM ERROR:", error);

    if (
      error instanceof Error &&
      error.message === "Room not found"
    ) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: error.message,
      });
    }

    if (
      error instanceof Error &&
      error.message === "Nickname already taken"
    ) {
      return res.status(StatusCodes.CONFLICT).json({
        success: false,
        message: error.message,
      });
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Internal Server Error",
    });
  }
}

export async function getRoomController(
  req: Request<{ roomCode: string }>,
  res: Response
) {
  try {
    const room = await getRoom(req.params.roomCode);

    res.status(StatusCodes.OK).json({
      success: true,
      data: room,
    });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: "Room not found",
    });
  }
}