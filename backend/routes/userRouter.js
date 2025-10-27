import express from "express";
import {
  createUser,
  getUser,
  userLogin,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.post("/login", userLogin);
userRouter.get("/me", getUser);

export default userRouter;
