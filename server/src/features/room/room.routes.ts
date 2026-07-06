import { Router } from "express";
import { createRoomController } from "./room.controller.js";

const router = Router();

router.post("/", createRoomController);

export default router;