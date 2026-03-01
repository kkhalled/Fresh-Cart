import { z } from "zod";

/* ═══════════════════════════════════════════════════════════════════════════
   Add Address Schema
   Validates address input with required fields.
   ═══════════════════════════════════════════════════════════════════════════ */

export const AddAddressSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),
  details: z
    .string()
    .min(5, "Details must be at least 5 characters")
    .max(200, "Details must not exceed 200 characters"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(20, "Phone number must not exceed 20 digits"),
  city: z
    .string()
    .min(2, "City must be at least 2 characters")
    .max(50, "City must not exceed 50 characters"),
  postalCode: z
    .string()
    .min(3, "Postal code must be at least 3 characters")
    .max(10, "Postal code must not exceed 10 characters")
    .optional()
    .or(z.literal("")),
});

export type AddAddressInputValues = z.infer<typeof AddAddressSchema>;
