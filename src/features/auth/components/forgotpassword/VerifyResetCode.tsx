"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { VerifyResetCodeSchema } from "../../schemas/ForgotPassword.schema";
import { toast } from "react-toastify";
import {
  VerifyCodeValues,
  verifyResetCodeAction,
} from "../../server/forgotPassword.action";

const CODE_LENGTH = 6;

type VerifyCodeFormValues = {
  resetCode: string;
};

export default function VerifyResetCode() {
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
        setError("resetCode", {
          type: "server",
          message: response.message,
        });
      }
      toast.error(response.message || "Failed to verify code");
    }
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
                  icon={faShieldHalved}
                  className="text-green-600 text-xl"
                />
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-xl font-semibold text-gray-900 mb-1 sm:text-2xl">
                Verify Reset Code
              </h1>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                We&apos;ve sent a verification resetCode to your email address.
              </p>
              <p className="mt-2 text-xs sm:text-sm font-medium text-green-600">
                {email}
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <p className="mb-2 text-center text-xs font-medium text-gray-700 sm:text-sm">
                  Enter 6-digit verification code
                </p>

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={CODE_LENGTH}
                  autoFocus
                  {...rest}
                  ref={(el) => {
                    ref(el);
                    inputRef.current = el;
                  }}
                  onChange={handleChange}
                  className="absolute opacity-0 pointer-events-none"
                />

                <div
                  className="flex justify-center gap-2 cursor-text"
                  onClick={() => inputRef.current?.focus()}
                >
                  {Array.from({ length: CODE_LENGTH }).map((_, index) => (
                    <div
                      key={index}
                      className={`h-11 w-11 rounded-lg border flex items-center justify-center text-sm font-semibold
                        ${
                          resetCode.length === index
                            ? "border-green-500 ring-1 ring-green-500"
                            : "border-gray-300"
                        }`}
                    >
                      {resetCode[index] || ""}
                    </div>
                  ))}
                </div>
                {errors.resetCode && (
                  <p className="mt-2 text-center text-[11px] text-red-600">
                    {errors.resetCode.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={resetCode.length !== CODE_LENGTH || isSubmitting}
                className="w-full rounded-lg py-2.5 px-4 text-sm font-semibold transition-colors duration-200
                  disabled:cursor-not-allowed
                  disabled:bg-gray-200
                  disabled:text-gray-400
                  bg-green-600 text-white hover:bg-green-700"
              >
                {isSubmitting ? "Verifying..." : "Verify Code"}
              </button>
            </form>

            {/* Links */}
            <div className="mt-4 text-center space-y-2 text-xs sm:text-sm">
              <p className="text-gray-600">
                Didn&apos;t receive the resetCode?
              </p>
              <button
                type="button"
                className="text-green-600 font-semibold hover:text-green-700"
              >
                Resend Code
              </button>
              <div>
                <Link
                  href="/signin"
                  className="text-green-600 font-semibold hover:text-green-700"
                >
                  Back to Sign In
                </Link>
              </div>
            </div>
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
