"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faKey,
  faEnvelope,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import {
  ResetPasswordFormValues,
  ResetPasswordSchema,
} from "../../schemas/ForgotPassword.schema";
import { resetPasswordAction } from "../../server/forgotPassword.action";

export default function ResetPassword() {
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
      // Use Object.values plus the key to map backend errors
      const keys = Object.keys(response.errors);
      Object.values(response.errors).forEach((message, index) => {
        const field = keys[index] as keyof ResetPasswordFormValues;
        setError(field, {
          type: "server",
          message: message as string,
        });
      });
    } else if (response.message) {
      // Business error like "email not found" – show under email
      setError("email", {
        type: "server",
        message: response.message,
      });
    }

    toast.error(response.message || "Failed to reset password");
  };
  return (
    <div className="min-h-[calc(100vh-120px)] bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
        {/* Centered Card */}
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-8 sm:px-8 sm:py-9">
            {/* Icon */}
            <div className="flex justify-center mb-5">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faKey}
                  className="text-green-600 text-xl"
                />
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-xl font-semibold text-gray-900 mb-1 sm:text-2xl">
                Reset Password
              </h1>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Enter your email address and new password to reset your account
                password.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-gray-700 mb-1.5 sm:text-sm sm:mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="text-gray-400 text-sm"
                    />
                  </div>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="Enter your email address"
                    className="block w-full rounded-lg border border-gray-300 bg-white pl-10 pr-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-[11px] text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-xs font-medium text-gray-700 mb-1.5 sm:text-sm sm:mb-2"
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    {...register("newPassword")}
                    placeholder="Enter new password"
                    className="block w-full rounded-lg border border-gray-300 bg-white pr-10 pl-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                  >
                    <FontAwesomeIcon
                      icon={showNewPassword ? faEyeSlash : faEye}
                      className="text-xs"
                    />
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="mt-1 text-[11px] text-red-600">
                    {errors.newPassword.message}
                  </p>
                )}

                {/* Password requirements */}
                <div className="mt-2 text-[11px] text-gray-500">
                  <p className="font-medium text-gray-700 mb-1">
                    Password must contain:
                  </p>
                  <ul className="space-y-0.5">
                    <li>At least 8 characters</li>
                    <li>One uppercase letter</li>
                    <li>One number</li>
                  </ul>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-xs font-medium text-gray-700 mb-1.5 sm:text-sm sm:mb-2"
                >
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword")}
                    placeholder="Confirm new password"
                    className="block w-full rounded-lg border border-gray-300 bg-white pr-10 pl-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                  >
                    <FontAwesomeIcon
                      icon={showConfirmPassword ? faEyeSlash : faEye}
                      className="text-xs"
                    />
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-[11px] text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 text-white py-2.5 px-4 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors duration-200 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                Reset Password
              </button>

              {/* Back to sign in */}
              <div className="pt-1 text-center text-xs sm:text-sm">
                <p className="text-gray-600">
                  Remember your password?{" "}
                  <Link
                    href="/signin"
                    className="font-semibold text-green-600 hover:text-green-700"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Footer help link */}
        <div className="w-full text-center text-xs sm:text-sm text-gray-600">
          Need help?{" "}
          <Link
            href="/contact"
            className="font-semibold text-green-600 hover:text-green-700"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
