import { z } from "zod";

export const SignUpSchema = z
  .object({
    name: z
      .string("Name is required ")
      .nonempty("Name cannot be empty")
      .min(2, "Name must be at least 2 characters long")
      .max(50, "Name must be at most 50 characters long"),

    email: z
      .string("Email is required")
      .nonempty("Email cannot be empty")
      .pipe(z.email("Invalid email address")),

    password: z
      .string("Password is required")
      .nonempty("Password cannot be empty")
      .min(8, "Password must be at least 8 characters long")
      .regex(/^[A-Z]/, "Password must contain at least one capital letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character",
      ),
    rePassword: z.string("Please confirm your password").nonempty("Please confirm your password"),
    phone: z
      .string("Phone is required")
      .nonempty("Phone cannot be empty")
      .regex(/^(\+2)?01[012][0-9]{8}$/, "Invalid Egyptian phone number"),
    terms: z.boolean().refine((val) => val === true, {
      error: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"], // Attach error to rePassword field
  });

export type SignUpInputValues = z.infer<typeof SignUpSchema>;
