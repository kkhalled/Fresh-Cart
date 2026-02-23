import { z } from "zod";

export const SignInSchema = z.object({
  email: z
    .string("Email is required")
    .nonempty("Email cannot be empty")
    .pipe(z.email("Invalid email address")),
  password: z
    .string("Password is required")
    .nonempty("Password cannot be empty"),
    rememberMe: z.boolean().optional(),
});

export type SignInInputValues = z.infer<typeof SignInSchema>;
