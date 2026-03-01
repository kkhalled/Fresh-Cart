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
    // Don't send empty phone string to the API
    const payload: UpdateProfileInputValues = {
      name: values.name,
      email: values.email,
      ...(values.phone ? { phone: values.phone } : {}),
    };

    const result = await updateUserProfile(payload);

    if (!result.ok) {
      toast.error(result.message);
      return;
    }

    const { data } = result;

    // Update Redux store with new user info
    dispatch(
      setAuthenticated({
        isAuthenticated: true,
        userInfo: {
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
        },
      })
    );

    // Reset form with updated values so defaultValues stay in sync
    reset({
      name: data.user.name,
      email: data.user.email,
      phone: values.phone || "",
    });

    toast.success(data.message || "Profile updated successfully!");
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    userInfo,
  };
}
