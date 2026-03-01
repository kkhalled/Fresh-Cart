import { z } from "zod";

/* ═══════════════════════════════════════════════════════════════════════════
   ChangePassword.schema.ts
   Validation schema for changing user password.
   ═══════════════════════════════════════════════════════════════════════════ */

export const ChangePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, "Current password must be at least 6 characters"),
    password: z
      .string()
      .min(6, "New password must be at least 6 characters")
      .max(50, "Password must be less than 50 characters"),
    rePassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
  })
  .refine((data) => data.currentPassword !== data.password, {
    message: "New password must be different from current password",
    path: ["password"],
  });

export type ChangePasswordInputValues = z.infer<typeof ChangePasswordSchema>;
