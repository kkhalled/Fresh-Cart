"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  ForgotPasswordSchema,
  ForgotPasswordValues,
} from "../schemas/ForgotPassword.schema";
import { forgotPasswordAction } from "../server/forgotPassword.action";

export default function useForgotPassword() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    defaultValues: { email: "" },
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit = async (values: ForgotPasswordValues) => {
    const response = await forgotPasswordAction(values);

    if (response.success) {
      toast.success(response.message || "Reset email sent successfully!");
      setTimeout(
        () => router.push(`/verify-reset-code?email=${values.email}`),
        2500,
      );
      return;
    }

    if (response.message) {
      setError("email", { type: "server", message: response.message });
    } else {
      toast.error("Failed to send reset email.");
    }
  };

  return { register, handleSubmit, errors, isSubmitting, onSubmit };
}
