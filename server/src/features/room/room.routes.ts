import { Router } from "express";
import {
  createRoomController,
  joinRoomController,
} from "./room.controller.js";

const router = Router();

// Create a room
router.post("/", createRoomController);

// Join a room
router.post("/:code/join", joinRoomController);

export default router;