"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { SignInInputValues, SignInSchema } from "../schemas/Signin.schema";
import signinAction from "../server/signin.action";
import setToken from "../server/auth.action";
import { setAuthenticated } from "../store/authSlice";
import { setCartMode } from "../../cart/store/cart.slice";
import { syncCartAfterSignin } from "../../cart/utils/cartSigninSync";
import { useAppDispatch } from "@/src/store/store";

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

        // 2. Merge guest cart into backend cart and fetch full server cart first.
        // Auth UI state flips only after cart sync is complete.
        let hasGuestItems = false;
        let mergeHadFailures = false;
        try {
          const syncResult = await syncCartAfterSignin(token, dispatch);
          hasGuestItems = syncResult.hasGuestItems;
          mergeHadFailures = syncResult.mergeHadFailures;
        } catch {
          toast.error("Signed in, but failed to load your cart.");
        }

        // 3. Mark authenticated in Redux after cart sync finishes.
        dispatch(
          setAuthenticated({
            isAuthenticated: true,
            userInfo: response.data.user,
          }),
        );
        dispatch(setCartMode("auth"));

        if (hasGuestItems && !mergeHadFailures) {
          toast.success("Signed in! Cart synced.", { autoClose: 2500 });
        } else if (hasGuestItems && mergeHadFailures) {
          toast.warn("Signed in. Some cart items could not be synced.", {
            autoClose: 2500,
          });
        } else {
          toast.success("Signed in successfully!", { autoClose: 2000 });
        }

        // 4. Redirect only after sync + fetch are done
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
