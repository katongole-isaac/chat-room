import mongoose from "mongoose";
import { z } from 'zod';
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
    

const userLogins = z.object({
  email: z.string().min(3,"Please provide a username (atleast 3 characters) or email"),
  password: z.string().min(1, "Please provide a password")
});

export type UserLogin = Required<z.infer<typeof userLogins>>;

export const validateUserLoginDto = (user: UserLogin ) => userLogins.safeParse(user);