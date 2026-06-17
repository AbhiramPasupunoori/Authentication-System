import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

console.log("MONGO_URI =", process.env.MONGO_URI);

// Connect Database and Start Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    console.log("Connection State:", mongoose.connection.readyState);

    app.listen(PORT, () => {
      console.log(`Server Running on Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ MongoDB Error:", err);
  });
