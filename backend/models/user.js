import mongoose from "mongoose";

console.log(
  "User model mongoose connection state:",
  mongoose.connection.readyState
);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

export default mongoose.model("User", userSchema);