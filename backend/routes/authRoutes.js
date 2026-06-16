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

router.get(
    "/profile",
    authMiddleware,
    (req, res) => {

        res.json({
            message: "Protected Route Accessed",
            user: req.user
        });
    }
);

export default router;