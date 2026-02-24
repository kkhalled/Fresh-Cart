import { z } from "zod";

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .pipe(z.email("Invalid email address")),
});

export type ForgotPasswordValues = z.infer<typeof ForgotPasswordSchema>;


export const VerifyResetCodeSchema = z.object({
  resetCode: z
    .string()
    .nonempty("Code is required")
    .length(6, "Code must be 6 characters long"),
});

export const ResetPasswordSchema = z
  .object({
    email: z
      .string()
      .nonempty("Email is required")
      .pipe(z.email("Invalid email address")),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/\d/, "Password must contain at least one number"),
    confirmPassword: z
      .string()
      .nonempty("Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

  export type ResetPasswordFormValues = z.infer<typeof ResetPasswordSchema>;