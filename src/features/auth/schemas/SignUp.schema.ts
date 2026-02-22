import { z } from "zod";

export const SignUpSchema = z
  .object({
    name: z
      .string("Name is required ")
      .min(2, "Name must be at least 2 characters long")
      .max(50, "Name must be at most 50 characters long"),
    email: z.email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/^[A-Z]/, "Password must contain at least one capital letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character",
      ),
    rePassword: z.string(),
    phone: z
      .string()
      .regex(/^(\+2)?01[012][0-9]{8}$/, "Invalid Egyptian phone number"),
    terms: z.boolean().refine((val) => val === true, {
      error: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
  });

 export type SignUpInputValues = z.infer<typeof SignUpSchema>;