import express from "express";
import { currentUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/currentuser", currentUser);

export { router as currentUserRouter };
