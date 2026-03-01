"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import {
  ChangePasswordSchema,
  type ChangePasswordInputValues,
} from "../schemas/ChangePassword.schema";
import { changeUserPassword } from "../server/account.server";

/* ═══════════════════════════════════════════════════════════════════════════
   useChangePassword.ts
   Hook for changing user password.
   ═══════════════════════════════════════════════════════════════════════════ */

export default function useChangePassword(onSuccess?: () => void) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ChangePasswordInputValues>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
  });

  const onSubmit = async (values: ChangePasswordInputValues) => {
    const result = await changeUserPassword(values);

    if (!result.ok) {
      toast.error(result.message);
      return;
    }

    toast.success(result.data.message || "Password changed successfully!");
    reset();
    onSuccess?.();
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
  };
}
