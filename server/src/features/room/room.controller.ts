import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { asyncHandler } from "../../common/utils/asyncHandler.js";
import { successResponse } from "../../common/utils/apiResponse.js";
import { createRoom, joinRoom } from "./room.service.js";

import { JoinRoomSchema } from "./room.validation.js";

export const createRoomController = asyncHandler(
  async (_req: Request, res: Response) => {
    const room = await createRoom("host-demo");

    res
      .status(StatusCodes.CREATED)
      .json(
        successResponse(
          room,
          "Room created successfully"
        )
      );
  }
);

export const joinRoomController = asyncHandler(
  async (req: Request, res: Response) => {
    const { code } = req.params;
    const body = JoinRoomSchema.parse(req.body);

    const room = await joinRoom(code as string, body.name);

    res.status(StatusCodes.OK).json(
      successResponse(
        room,
        "Player joined successfully"
      )
    );
  }
);