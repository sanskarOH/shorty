import express from "express";
import { handleCreateUrl } from "./saveUrl.service";
import { validateRequest } from "../../utils/validator";
import { urlSaveSchema } from "./saveUrl.schema";

const router = express.Router();

router.post("/shorten", validateRequest(urlSaveSchema), handleCreateUrl)

export default router; 