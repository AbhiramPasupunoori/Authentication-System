import express from "express";

import {
    register,
    login
} 
from "/Users/abhiram/Desktop/Authentication-System/backend/controllers/authControllers.js";

import authMiddleware from "/Users/abhiram/Desktop/Authentication-System/backend/middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

import User from "../models/User.js";

router.get(
  "/profile",
  authMiddleware,
  async (req, res) => {
    try {

      const user = await User.findById(
        req.user.id
      ).select("-password");

      res.json(user);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });
    }
  }
);

export default router;