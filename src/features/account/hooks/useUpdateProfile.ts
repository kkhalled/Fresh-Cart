"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  UpdateProfileSchema,
  type UpdateProfileInputValues,
} from "../schemas/UpdateProfile.schema";
import { updateUserProfile } from "../server/account.server";
import { setAuthenticated } from "../../auth/store/authSlice";
import type { AppState } from "@/src/store/store";

/* ═══════════════════════════════════════════════════════════════════════════
   useUpdateProfile.ts
   Hook for updating user profile information.
   ═══════════════════════════════════════════════════════════════════════════ */

export default function useUpdateProfile() {
  const dispatch = useDispatch();
  const { userInfo, isAuthenticated } = useSelector(
    (state: AppState) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<UpdateProfileInputValues>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      name: userInfo?.name || "",
      email: userInfo?.email || "",
      phone: "",
    },
  });

  const onSubmit = async (values: UpdateProfileInputValues) => {
    try {
      const response = await updateUserProfile(values);

      // Update Redux store with new user info
      dispatch(
        setAuthenticated({
          isAuthenticated: true,
          userInfo: {
            name: response.user.name,
            email: response.user.email,
            role: response.user.role,
          },
        })
      );

      toast.success(response.message || "Profile updated successfully!");
    } catch (error: any) {
      const errorData = error?.response?.data;
      
      // Handle validation errors from backend
      if (errorData?.errors) {
        const backendError = errorData.errors;
        
        // Check if it's a single error object with param and msg
        if (backendError.param && backendError.msg) {
          const fieldName = backendError.param;
          setError(fieldName as keyof UpdateProfileInputValues, {
            message: backendError.msg,
          });
          
          toast.error(backendError.msg);
        } 
        // Handle multiple errors (object with field keys)
        else if (typeof backendError === 'object') {
          Object.keys(backendError).forEach((key) => {
            setError(key as keyof UpdateProfileInputValues, {
              message: backendError[key],
            });
          });
          
          const message = errorData?.message || "Failed to update profile";
          toast.error(message);
        }
      } else {
        const message =
          errorData?.message ||
          error?.message ||
          "Failed to update profile";
        toast.error(message);
      }
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    userInfo,
  };
}
