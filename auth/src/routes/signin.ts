import express from "express";
import { signin } from "../controllers/auth.controller.js";
import { signinValidation } from "../validators/auth.validators.js";
import { handleValidationErrors } from "../middleware/validation.js";

const router = express.Router();

router.post("/signin", signinValidation, handleValidationErrors, signin);

export { router as signinRouter };
