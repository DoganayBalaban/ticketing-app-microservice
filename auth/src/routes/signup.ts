import express from "express";
import { signup } from "../controllers/auth.controller.js";
import { signupValidation } from "../validators/auth.validators.js";
import { handleValidationErrors } from "../middleware/validation.js";

const router = express.Router();

router.post("/signup", signupValidation, handleValidationErrors, signup);

export { router as signupRouter };
