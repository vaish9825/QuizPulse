import { Request, Response } from "express";
import { createRoom } from "./room.service.js";
import { joinRoom } from "./room.service.js";

export async function createRoomController(
  req: Request,
  res: Response
) {
  try {
    const room = await createRoom("host-demo");

    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create room",
    });
  }
}

export async function joinRoomController(
  req: Request,
  res: Response
) {
  try {
    const { code } = req.params;

    const { name } = req.body;

  const room = await joinRoom(code as string, name);

    res.json(room);
  } catch (error) {
    res.status(404).json({
      message:
        error instanceof Error
          ? error.message
          : "Unknown Error",
    });
  }
}