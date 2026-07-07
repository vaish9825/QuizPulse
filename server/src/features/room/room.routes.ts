 import { Router } from "express";

import {
  createRoomController,
  joinRoomController,
} from "./room.controller.js";

const router = Router();

router.post("/", createRoomController);

router.post("/:roomCode/join", joinRoomController);

export default router;