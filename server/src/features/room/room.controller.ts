import { Request, Response } from "express";
import { createRoom } from "./room.service.js";

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