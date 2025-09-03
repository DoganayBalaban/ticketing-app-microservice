import express from "express";
import { signout } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/signout", signout);

export { router as signoutRouter };
