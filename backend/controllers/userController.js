import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import axios from "axios";

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
  if (!isAdmin) {
    req.status(403).json({
      message: "Frobiddn",
    });
    return;
  }

  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "failed to get users",
    });
  }
};
