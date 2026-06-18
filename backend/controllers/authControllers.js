import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

console.log("AUTH CONTROLLER FILE LOADED");
console.log(import.meta.url);

export const register = async (req, res) => {
  try {
    console.log("=================================");
    console.log("REGISTER ROUTE HIT");
    console.log("Request Body:", req.body);

    const { name, email, password } = req.body;

    console.log("STEP 1 - Data Extracted");

    console.log(
      "Mongoose Connection State:",
      mongoose.connection.readyState
    );

    // 0 = disconnected
    // 1 = connected
    // 2 = connecting
    // 3 = disconnecting

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    console.log("STEP 2 - Validation Passed");

    console.log("Checking existing user...");

    console.log("BEFORE findOne");

    const existingUser = await User.findOne({
      email,
    });

    console.log("AFTER findOne");

    console.log(
      "STEP 3 - Existing User Check Complete"
    );

    console.log(
      "Existing User:",
      existingUser
    );

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    console.log("STEP 4 - Hashing Password");

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    console.log("STEP 5 - Password Hashed");

    console.log("Creating User...");

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log("STEP 6 - User Created");

    console.log(user);

    res.status(201).json({
      message: "Registration Successful",
    });

  } catch (error) {

    console.log("=================================");
    console.log("REGISTER ERROR");
    console.log(error);
    console.log("=================================");

    res.status(500).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    console.log("LOGIN ATTEMPT:", email);

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {

    console.log("LOGIN ERROR:");
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};