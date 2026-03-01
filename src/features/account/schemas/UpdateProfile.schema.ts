import { z } from "zod";

/* ═══════════════════════════════════════════════════════════════════════════
   UpdateProfile.schema.ts
   Validation schema for updating user profile information.
   ═══════════════════════════════════════════════════════════════════════════ */

export const UpdateProfileSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z
    .string()
    .email("Invalid email format")
    .min(1, "Email is required"),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[0-9]{10,15}$/.test(val),
      "Phone must be 10-15 digits"
    ),
});

export type UpdateProfileInputValues = z.infer<typeof UpdateProfileSchema>;
