 import { Router } from "express";

import {
  createRoomController,
  joinRoomController,
  getRoomController,
} from "./room.controller.js";

const router = Router();

router.post("/", createRoomController);

router.post("/:roomCode/join", joinRoomController);
router.get("/:roomCode", getRoomController);

export default router;