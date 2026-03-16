"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { SignInInputValues, SignInSchema } from "../schemas/Signin.schema";
import signinAction from "../server/signin.action";
import setToken from "../server/auth.action";
import { setAuthenticated } from "../store/authSlice";
import { setCartMode, resetCartInitialized } from "../../cart/store/cart.slice";
import { getGuestCart, clearGuestCart } from "../../cart/utils/guestCart.storage";
import { fetchCart } from "../../cart/store/cart.thunks";
import { useAppDispatch } from "@/src/store/store";
import { CART_ENDPOINTS } from "@/src/config/api";

/* ═══════════════════════════════════════════════════════════════════════════
   mergeGuestCartDirect
   Sends guest cart items to the server using direct axios calls with
   the token from the signin response. Bypasses Next.js server actions
   entirely — no serialization boundary issues.
   ═══════════════════════════════════════════════════════════════════════════ */
async function mergeGuestCartDirect(token: string): Promise<void> {
  const guestItems = getGuestCart();
  if (guestItems.length === 0) return;

  // 1. Fetch the user's existing server cart so we know what already exists
  const existingCounts = new Map<string, number>();
  try {
    const { data: cartRes } = await axios.get(CART_ENDPOINTS.cart, {
      headers: { token },
    });
    if (cartRes?.data?.products) {
      for (const p of cartRes.data.products) {
        const pid = typeof p.product === "string" ? p.product : p.product._id;
        existingCounts.set(pid, p.count);
      }
    }
  } catch {
    // No existing cart yet — that's fine, we'll create one
  }

  // 2. For each guest item, add it or update its quantity
  for (const item of guestItems) {
    if (!item.productId || item.quantity <= 0) continue;

    const existingQty = existingCounts.get(item.productId) ?? 0;
    const targetQty = existingQty + item.quantity;

    try {
      if (existingQty === 0) {
        // Product not in server cart → add it
        await axios.post(
          CART_ENDPOINTS.cart,
          { productId: item.productId },
          { headers: { token } },
        );
        // If quantity > 1, update to the correct amount
        if (targetQty > 1) {
          await axios.put(
            CART_ENDPOINTS.cartItem(item.productId),
            { count: targetQty },
            { headers: { token } },
          );
        }
      } else {
        // Product already exists → just update quantity
        await axios.put(
          CART_ENDPOINTS.cartItem(item.productId),
          { count: targetQty },
          { headers: { token } },
        );
      }
    } catch {
      // If one item fails, continue with the rest
      console.warn(`Failed to merge guest cart item: ${item.productId}`);
    }
  }

  // 3. Clear the guest cart from localStorage
  clearGuestCart();
}

export default function useSignin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignInInputValues>({
    defaultValues: { email: "", password: "", rememberMe: false },
    resolver: zodResolver(SignInSchema),
    mode: "onSubmit",
  });

  const togglePassword = () => setShowPassword((prev) => !prev);

  const onSubmit = async (values: SignInInputValues) => {
    try {
      const response = await signinAction(values);

      if (response?.success) {
        const token: string = response.data.token;

        // 1. Store token in cookie
        await setToken(token, values.rememberMe ?? false);

        // 2. Mark authenticated in Redux
        dispatch(
          setAuthenticated({
            isAuthenticated: true,
            userInfo: response.data.user,
          }),
        );

        // 3. Switch cart to auth mode
        dispatch(setCartMode("auth"));

        // 4. Check if there are guest cart items to merge
        const guestItems = getGuestCart();
        const hasGuestItems = guestItems.length > 0;

        if (hasGuestItems) {
          toast.success("Signed in! Syncing your cart…", { autoClose: 2500 });
        } else {
          toast.success("Signed in successfully!", { autoClose: 2000 });
        }

        // 5. Merge guest cart items into server cart (direct axios, no server actions)
        if (hasGuestItems) {
          try {
            await mergeGuestCartDirect(token);
          } catch {
            toast.error("Some cart items couldn't be synced.");
          }
        }

        // 6. Fetch the final server cart into Redux (always, whether merge happened or not)
        dispatch(resetCartInitialized());
        try {
          await dispatch(fetchCart()).unwrap();
        } catch {
          // Cart fetch failed — user will see empty/stale cart but at least they're logged in
        }

        // 7. Redirect only after everything is done
        const redirectTo = searchParams.get("redirect") || "/";
        router.push(redirectTo);
      } else {
        toast.error(response?.message || "Signin failed.");
        if (response?.errors) {
          Object.keys(response.errors).forEach((key) => {
            setError(key as keyof SignInInputValues, {
              message: response.errors[key],
            });
          });
        }
      }
    } catch {
      toast.error("An unexpected error occurred.");
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    showPassword,
    togglePassword,
    onSubmit,
  };
}
