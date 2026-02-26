"use client";

import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { VerifyResetCodeSchema } from "../schemas/ForgotPassword.schema";
import {
  forgotPasswordAction,
  VerifyCodeValues,
  verifyResetCodeAction,
} from "../server/forgotPassword.action";

export const CODE_LENGTH = 6;

type VerifyCodeFormValues = { resetCode: string };

export default function useVerifyResetCode() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const {
    handleSubmit,
    register,
    setValue,
    setError,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<VerifyCodeFormValues>({
    defaultValues: { resetCode: "" },
    resolver: zodResolver(VerifyResetCodeSchema),
  });

  const resetCode = watch("resetCode") || "";
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register("resetCode");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setValue("resetCode", value.slice(0, CODE_LENGTH), {
      shouldValidate: true,
    });
  };

  const onSubmit = async (values: VerifyCodeValues) => {
    const response = await verifyResetCodeAction(values);

    if (response.success) {
      toast.success(response.message);
      router.push(`/reset-password?email=${email}`);
    } else {
      if (response.message) {
        setError("resetCode", { type: "server", message: response.message });
      }
      toast.error(response.message || "Failed to verify code");
    }
  };

  const handleResendCode = async () => {
    const response = await forgotPasswordAction({ email });
    if (response.success) {
      toast.success("Verification code resent successfully");
    } else {
      toast.error(response.message || "Failed to resend verification code");
    }
  };

  return {
    email,
    resetCode,
    inputRef,
    ref,
    rest,
    handleChange,
    handleSubmit,
    onSubmit,
    handleResendCode,
    isSubmitting,
    errors,
    CODE_LENGTH,
  };
}
