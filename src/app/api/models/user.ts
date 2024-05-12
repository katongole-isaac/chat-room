import mongoose from "mongoose";
import { Signup, signupSchema } from "../../../lib/mongo/schemas";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    maxLength: 40,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true

  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;

export const validateUserDto = (user: Required<Signup>) =>
  signupSchema.safeParse(user);
    