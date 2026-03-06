"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import {
  ResetPasswordFormValues,
  ResetPasswordSchema,
} from "../schemas/ForgotPassword.schema";
import { resetPasswordAction } from "../server/forgotPassword.action";

export default function useResetPassword() {
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get("email") || "";
  const router = useRouter();

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    defaultValues: {
      email: emailFromQuery,
      newPassword: "",
      confirmPassword: "",
    },
    resolver: zodResolver(ResetPasswordSchema),
  });
  

  const onSubmit = async (values: ResetPasswordFormValues) => {
    const response = await resetPasswordAction(values);
    
    if (response.success) {
      toast.success(response.message || "Password reset successfully");
      setTimeout(() => router.push("/signin"), 2500);
      return;
    }

    if (response.errors) {
      const keys = Object.keys(response.errors);
      Object.values(response.errors).forEach((message, index) => {
        const field = keys[index] as keyof ResetPasswordFormValues;
        setError(field, { type: "server", message: message as string });
      });
    } else if (response.message) {
      setError("email", { type: "server", message: response.message });
    }

    toast.error(response.message || "Failed to reset password");
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    showNewPassword,
    showConfirmPassword,
    toggleNewPassword: () => setShowNewPassword((p) => !p),
    toggleConfirmPassword: () => setShowConfirmPassword((p) => !p),
    onSubmit,
  };
}
