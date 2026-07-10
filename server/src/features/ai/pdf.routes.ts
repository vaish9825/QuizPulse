import { Router } from "express";

import { upload } from "../../common/middleware/upload.js";

import { uploadPdf } from "./pdf.controller.js";

const router = Router();

router.post(
  "/generate",
  upload.single("pdf"),
  uploadPdf
);

export default router;