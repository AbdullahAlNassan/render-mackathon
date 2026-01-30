import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("email is required"),
  password: z.string().min(6, "password must be at least 6 characters"),
});

export const RegisterSchema = LoginSchema;