import express from "express";
import { getMe } from "../controllers/auth.controller.js";
import { currentUser } from "../middleware/currentUser.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();

router.get("/currentuser", currentUser, requireAuth, getMe);

export { router as currentUserRouter };
