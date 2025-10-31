import express from "express";
import {
  createUser,
  getAllUsers,
  getUser,
  googleLogin,
  userLogin,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.post("/login", userLogin);
userRouter.get("/me", getUser);
userRouter.post("/google-login", googleLogin);
userRouter.get("/all-users", getAllUsers);

export default userRouter;
