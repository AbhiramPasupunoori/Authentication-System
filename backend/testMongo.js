import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

console.log("Connected");

const collections = await mongoose.connection.db
  .listCollections()
  .toArray();

console.log(collections);

process.exit();