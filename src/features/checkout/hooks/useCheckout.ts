"use client";

import { useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/src/store/store";
import { setPaymentMethod, resetCheckout } from "../store/checkout.slice";
import {
  createCashOrderThunk,
  createOnlineSessionThunk,
} from "../store/checkout.thunks";
import { clearCart } from "../../cart/store/cart.slice";
import {
  ShippingAddressSchema,
  type ShippingAddressInputValues,
} from "../schemas/Checkout.schema";
import type { PaymentMethod } from "../types/checkout.types";

/* ═══════════════════════════════════════════════════════════════════════════
   useCheckout
   Orchestrates form validation, payment method selection, and order
   submission. Prevents double-submit with a ref-based lock.
   ═══════════════════════════════════════════════════════════════════════════ */

export default function useCheckout() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const submittingRef = useRef(false);

  const cartId = useAppSelector((s) => s.cart.cartId);
  const items = useAppSelector((s) => s.cart.items);
  const total = useAppSelector((s) => s.cart.total);
  const numOfCartItems = useAppSelector((s) => s.cart.numOfCartItems);
  const loading = useAppSelector((s) => s.checkout.loading);
  const error = useAppSelector((s) => s.checkout.error);
  const paymentMethod = useAppSelector((s) => s.checkout.paymentMethod);

  const {
    register,
    handleSubmit: formSubmit,
    formState: { errors },
  } = useForm<ShippingAddressInputValues>({
    resolver: zodResolver(ShippingAddressSchema),
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
  });

  /* ── Choose Payment Method ──────────────────────────────────────────── */
  const choosePaymentMethod = useCallback(
    (method: PaymentMethod) => {
      dispatch(setPaymentMethod(method));
    },
    [dispatch],
  );

  /* ── Submit Order ───────────────────────────────────────────────────── */
  const onSubmit = useCallback(
    async (values: ShippingAddressInputValues) => {
      // Guard: prevent double submit
      if (submittingRef.current || loading) return;

      // Guard: must have cart
      if (!cartId) {
        toast.error("Your cart is empty");
        router.push("/cart");
        return;
      }

      submittingRef.current = true;

      const shippingAddress = {
        details: values.details,
        phone: values.phone,
        city: values.city,
      };

      try {
        if (paymentMethod === "cash") {
          await dispatch(
            createCashOrderThunk({ cartId, shippingAddress }),
          ).unwrap();

          // Clear cart in Redux after successful order
          dispatch(clearCart());
          dispatch(resetCheckout());

          toast.success("Order placed successfully!");
          router.push("/orders");
        } else {
          const originUrl = window.location.origin;

          const result = await dispatch(
            createOnlineSessionThunk({
              cartId,
              shippingAddress,
              originUrl,
            }),
          ).unwrap();

          // Redirect to payment gateway
          window.location.href = result.sessionUrl;
        }
      } catch (err: unknown) {
        const message =
          err instanceof Error
            ? err.message
            : typeof err === "string"
              ? err
              : "Something went wrong";
        toast.error(message);
      } finally {
        submittingRef.current = false;
      }
    },
    [cartId, paymentMethod, loading, dispatch, router],
  );

  return {
    // Form
    register,
    handleSubmit: formSubmit(onSubmit),
    errors,

    // Cart info
    cartId,
    items,
    total,
    numOfCartItems,

    // Checkout state
    loading,
    error,
    paymentMethod,
    choosePaymentMethod,
  };
}
