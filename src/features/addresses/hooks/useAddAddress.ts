"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import {
  AddAddressSchema,
  type AddAddressInputValues,
} from "../schemas/AddAddress.schema";
import { addUserAddress } from "../server/address.server";

/* ═══════════════════════════════════════════════════════════════════════════
   useAddAddress Hook
   Manages adding a new address with form validation.
   ═══════════════════════════════════════════════════════════════════════════ */

export default function useAddAddress(onSuccess?: () => void) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<AddAddressInputValues>({
    resolver: zodResolver(AddAddressSchema),
    defaultValues: {
      name: "",
      details: "",
      phone: "",
      city: "",
      postalCode: "",
    },
  });

  const onSubmit = async (values: AddAddressInputValues) => {
    try {
      const response = await addUserAddress(values);

      toast.success(response.message || "Address added successfully!");
      reset();
      onSuccess?.();
    } catch (error: any) {
      const errorData = error?.response?.data;

      // Handle validation errors from backend
      if (errorData?.errors) {
        const backendError = errorData.errors;

        // Check if it's a single error object with param and msg
        if (backendError.param && backendError.msg) {
          const fieldName = backendError.param;
          setError(fieldName as keyof AddAddressInputValues, {
            message: backendError.msg,
          });

          toast.error(backendError.msg);
        }
        // Handle multiple errors (object with field keys)
        else if (typeof backendError === "object") {
          Object.keys(backendError).forEach((key) => {
            setError(key as keyof AddAddressInputValues, {
              message: backendError[key],
            });
          });

          const message = errorData?.message || "Failed to add address";
          toast.error(message);
        }
      } else {
        const message =
          errorData?.message || error?.message || "Failed to add address";
        toast.error(message);
      }
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    reset,
  };
}
