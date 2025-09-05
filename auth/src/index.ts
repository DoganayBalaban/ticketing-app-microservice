import express from "express";
import "express-async-errors";
import { currentUserRouter } from "./routes/current-user.js";
import { signinRouter } from "./routes/signin.js";
import { signoutRouter } from "./routes/signout.js";
import { signupRouter } from "./routes/signup.js";
import { errorHandler, NotFoundError } from "./middleware/errorHandler.js";
import mongoose from "mongoose";
const app = express();
app.use(express.json());

// Routes
app.use("/api/users", currentUserRouter);
app.use("/api/users", signinRouter);
app.use("/api/users", signoutRouter);
app.use("/api/users", signupRouter);

// Handle 404 errors
app.all("*", async () => {
  throw new NotFoundError();
});

// Error handling middleware (must be last)
app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }
};

app.listen(3000, () => {
  console.log("listening on port 3000!!!");
  start();
});
