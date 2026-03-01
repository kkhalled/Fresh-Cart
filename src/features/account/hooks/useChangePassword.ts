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
    setError,
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
    try {
      const response = await changeUserPassword(values);

      toast.success(response.message || "Password changed successfully!");
      reset();
      onSuccess?.();
    } catch (error: any) {
      const errorData = error?.response?.data;
      
      // Handle validation errors from backend
      if (errorData?.errors) {
        const backendError = errorData.errors;
        
        // Check if it's a single error object with param and msg
        if (backendError.param && backendError.msg) {
          // Map backend param names to form field names
          const fieldMapping: Record<string, keyof ChangePasswordInputValues> = {
            password: "currentPassword",
            newPassword: "password",
            rePassword: "rePassword",
          };
          
          const fieldName = fieldMapping[backendError.param] || backendError.param;
          setError(fieldName as keyof ChangePasswordInputValues, {
            message: backendError.msg,
          });
          
          toast.error(backendError.msg);
        } 
        // Handle multiple errors (object with field keys)
        else if (typeof backendError === 'object') {
          Object.keys(backendError).forEach((key) => {
            setError(key as keyof ChangePasswordInputValues, {
              message: backendError[key],
            });
          });
          
          const message = errorData?.message || "Failed to change password";
          toast.error(message);
        }
      } else {
        const message =
          errorData?.message ||
          error?.message ||
          "Failed to change password";
        toast.error(message);
      }
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
  };
}
