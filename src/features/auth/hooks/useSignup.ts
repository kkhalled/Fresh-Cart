"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpInputValues, SignUpSchema } from "../schemas/SignUp.schema";
import { signupAction } from "../server/signup.action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function useSignup() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignUpInputValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      terms: false,
    },
    resolver: zodResolver(SignUpSchema),
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<SignUpInputValues> = async (values) => {
    try {
      const response = await signupAction(values);
      if (response.success) {
        toast.success(response.message);
        setTimeout(() => router.push("/signin"), 2500);
      } else {
        if (response?.errors) {
          Object.keys(response.errors).forEach((key) => {
            setError(key as keyof SignUpInputValues, {
              message: response.errors[key],
            });
          });
        } else {
          toast.error(response.message || "Signup failed. Please try again.");
        }
      }
    } catch {
      toast.error("An unexpected error occurred during signup.");
    }
  };

  return { register, handleSubmit, errors, onSubmit, isSubmitting };
}
