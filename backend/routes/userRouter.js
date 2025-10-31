import express from "express";
import {
  createUser,
  getAllUsers,
  getUser,
  googleLogin,
  userLogin,
  blockUser,
  sendOTP,
  changePasswordViaOTP,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.post("/login", userLogin);
userRouter.get("/me", getUser);
userRouter.post("/google-login", googleLogin);
userRouter.get("/all-users", getAllUsers);
userRouter.put("/block/:email", blockUser);
userRouter.get("/send-otp/:email", sendOTP);
userRouter.post("/change-password/", changePasswordViaOTP);

export default userRouter;
