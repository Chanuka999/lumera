import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import axios from "axios";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import OTP from "../models/otpModel.js";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.APP_PASSWORD,
  },
});

export const createUser = (req, res) => {
  const hashPassword = bcrypt.hashSync(req.body.password, 10);
  const user = new User({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: hashPassword,
  });

  user
    .save()
    .then(() => {
      res
        .status(200)
        .json({ success: true, message: "user create successfull" });
    })
    .catch(() => {
      res.status(401).json({ success: false, message: "error" });
    });
};

export const userLogin = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).then((user) => {
    if (user == null) {
      res.json({
        message: "user not found",
      });
    } else {
      if (user.isBlock) {
        res.status(403).json({
          message: "Your accout has been blocked.please contact admin",
        });
        return;
      }
      const isPasswordMatching = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (isPasswordMatching) {
        const token = jwt.sign(
          {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            isEmailVerified: user.isEmailVerified,
            image: user.image,
          },
          process.env.JWT_SECRET
        );
        res.json({
          message: "Login successfull",
          token: token,
          user: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            isEmailVerified: user.isEmailVerified,
          },
        });
      } else {
        res.json({
          message: "Invalid password",
        });
      }
    }
  });
};

export const isAdmin = (req) => {
  if (req.user == null) {
    return false;
  }

  if (req.user.role != "admin") {
    return false;
  }

  return true;
};

export const getUser = (req, res) => {
  if (req.user == null) {
    res.status(401).json({
      message: "unauthorized",
    });
    return;
  } else {
    res.json(req.user);
  }
};

export const googleLogin = async (req, res) => {
  const token = req.body.token;

  if (token == null) {
    res.status(400).json({
      message: "token is required",
    });
    return;
  }
  try {
    const googleResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const googleUser = googleResponse.data;

    const user = await User.findOne({
      email: googleUser.email,
    });

    if (user == null) {
      const newUser = new User({
        email: googleUser.email,
        firstName: googleUser.given_name,
        lastName: googleUser.family_name,

        password: Math.random().toString(36).slice(2),

        isEmailVerified: !!googleUser.email_verified,
        image: googleUser.picture,
      });

      const savedUser = await newUser.save();

      const jwtToken = jwt.sign(
        {
          email: savedUser.email,
          firstName: savedUser.firstName,
          lastName: savedUser.lastName,
          role: savedUser.role,
          isEmailVerified: savedUser.isEmailVerified,
          image: savedUser.image,
        },
        process.env.JWT_SECRET
      );

      res.json({
        message: "login successfull",
        token: jwtToken,
        user: {
          email: savedUser.email,
          firstName: savedUser.firstName,
          lastName: savedUser.lastName,
          role: savedUser.role,
          isEmailVerified: savedUser.isEmailVerified,
          image: savedUser.image,
        },
      });
      return;
    } else {
      if (user.isBlock) {
        res.status(403).json({
          message: "Your account has been blocked.please contact admin",
        });
        return;
      }
      const jwtToken = jwt.sign(
        {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
          image: user.image,
        },
        process.env.JWT_SECRET
      );
      res.json({
        message: "login successfull",
        token: jwtToken,
        user: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
          image: user.image,
        },
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      message: "Failed to login with google",
    });
    return;
  }
};

export const getAllUsers = async (req, res) => {
  // Check admin permission
  if (!isAdmin(req)) {
    return res.status(403).json({ message: "forbidden" });
  }

  try {
    const users = await User.find();
    // return consistent response shape expected by frontend
    return res.json({ data: users });
  } catch (error) {
    console.error("getAllUsers error:", error);
    return res.status(500).json({ message: "failed to get users" });
  }
};

export const blockUser = async (req, res) => {
  // Only admins can toggle block status
  if (!isAdmin(req)) {
    return res.status(403).json({ message: "forbidden" });
  }

  const email = req.params.email;
  const { isBlock } = req.body;

  if (!email) {
    return res.status(400).json({ message: "email is required" });
  }

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { isBlock: !!isBlock },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    return res.json({ success: true, data: user });
  } catch (error) {
    console.error("blockUser error:", error);
    return res.status(500).json({ message: "failed to change block status" });
  }
};

export const sendOTP = async (req, res) => {
  const email = req.params.email;
  if (email == null) {
    res.status(400).json({
      message: "Email is required",
    });
    return;
  }

  const generatedOtp = Math.floor(100000 + Math.random() * 900000);

  try {
    // remove any previous OTPs for this email
    await OTP.deleteMany({
      email: email,
    });

    const newOTP = new OTP({
      email: email,
      otp: generatedOtp,
    });

    await newOTP.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP for password reset",
      text: `your OTP for password reset is ${generatedOtp}. It is valid for 10 minutes`,
    });

    res.json({
      message: "OTP sent to your email",
    });
  } catch (error) {
    console.error("sendOTP error:", error);
    res.status(500).json({
      message: "Failed to send OTP",
    });
  }
};

export const changePasswordViaOTP = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res
      .status(400)
      .json({ message: "email, otp and newPassword are required" });
  }

  try {
    const otpRecord = await OTP.findOne({ email: email, otp: otp });
    if (otpRecord == null) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // delete OTPs for this email so they can't be reused
    await OTP.deleteMany({ email: email });

    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    const updated = await User.findOneAndUpdate(
      { email: email },
      { password: hashedPassword },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ message: "password changed successfully" });
  } catch (error) {
    console.error("changePasswordViaOTP error:", error);
    return res.status(500).json({ message: "Failed to change password" });
  }
};

export const updateUserData = async (req, res) => {
  if (req.user == null) {
    res.status(401).json({
      message: "unauthorized",
    });
    return;
  }

  try {
    await User.updateOne(
      {
        email: req.user.email,
      },
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        image: req.body.image,
      }
    );
    res.json({
      message: "user data update successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to update user data",
    });
  }
};

export const updatePassword = async (req, res) => {
  if (req.user == null) {
    res.status(401).json({
      message: "unauthorized",
    });
    return;
  }
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    await User.updateOne(
      {
        email: req.user.email,
      },
      {
        password: hashedPassword,
      }
    );
    res.json({
      message: "password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update password",
    });
  }
};
