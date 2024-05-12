import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  username: z
    .string()
    .regex(
      new RegExp(/^(?=.*[A-Za-z])[A-Za-z\d_-]{3,30}$/),
      "Please ensure that your username only contains letters, digits, underscores, or hyphens"
    ),
  password: z
    .string()
    .regex(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]{6,}$/), {
      message:
        "Please ensure that your password contains at least 6 characters, including at least one digit",
    }),
});

export type Signup = z.infer<typeof signupSchema>;
