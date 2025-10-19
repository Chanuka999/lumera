import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";

import studentRouter from "./routes/studentRouter.js";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
app.use((req, res, next) => {
  const authHeader = req.header("Authorization");

  // If there's no Authorization header, continue without auth
  if (!authHeader) return next();

  // Safely remove Bearer prefix if present
  const token = authHeader.replace(/^Bearer\s+/i, "");

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err || !decoded) {
      return res
        .status(401)
        .json({ message: "invalid token please login again" });
    }
    req.user = decoded;
    next();
  });
});

const connectionString = process.env.MONGOURL;

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("database connected");
  })
  .catch(() => {
    console.log("not conected");
  });

app.use("/api/students", studentRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
