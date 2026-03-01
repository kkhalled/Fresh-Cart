"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { SignInInputValues, SignInSchema } from "../schemas/Signin.schema";
import signinAction from "../server/signin.action";
import setToken from "../server/auth.action";
import { setAuthenticated } from "../store/authSlice";
import { resetCartInitialized } from "../../cart/store/cart.slice";

export default function useSignin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
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
        await setToken(response.data.token, values.rememberMe ?? false);
        dispatch(
          setAuthenticated({
            isAuthenticated: true,
            userInfo: response.data.user,
          }),
        );
        // Reset cart to trigger re-initialization and merge guest items
        dispatch(resetCartInitialized());
        toast.success("Signed in successfully!", { autoClose: 1800 });
        
        // Redirect to the page specified in the query param, or home
        const redirectTo = searchParams.get("redirect") || "/";
        setTimeout(() => router.push(redirectTo), 1900);
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
