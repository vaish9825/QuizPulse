import { Router } from "express";

import {
  getCurrentQuestionController,
} from "./game.controller.js";

const router = Router();

router.get(
  "/:roomCode/question",
  getCurrentQuestionController
);

export default router;