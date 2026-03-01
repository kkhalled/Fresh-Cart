import { z } from "zod";

/* ═══════════════════════════════════════════════════════════════════════════
   Checkout Schema
   Validates shipping address fields.
   ═══════════════════════════════════════════════════════════════════════════ */

export const ShippingAddressSchema = z.object({
  details: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address must not exceed 200 characters"),
  phone: z
    .string()
    .regex(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number"),
  city: z
    .string()
    .min(2, "City must be at least 2 characters")
    .max(50, "City must not exceed 50 characters"),
});

export type ShippingAddressInputValues = z.infer<typeof ShippingAddressSchema>;
