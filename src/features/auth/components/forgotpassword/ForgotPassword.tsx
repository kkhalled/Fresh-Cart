"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldHalved,
  faEnvelope,
  faArrowRight,
  faLock,
  faQuestionCircle,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
// import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordSchema, ForgotPasswordValues } from "../../schemas/ForgotPassword.schema";
import { useForm } from "react-hook-form";
import { forgotPasswordAction } from "../../server/forgotPassword.action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


export default function ForgotPassword() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(ForgotPasswordSchema),
  });

  async function onSubmit(values: ForgotPasswordValues) {
    const response = await forgotPasswordAction(values);

    if (response.success) {
      toast.success(response.message || "Reset email sent successfully!");
      setTimeout(() => router.push(`/verify-reset-code?email=${values.email}`), 2500);
      return;
    }

    // Handle backend validation error on email (e.g. "There is no user registered with this email address ...")
    if (response.message) {
      setError("email", {
        type: "server",
        message: response.message,
      });
    } else {
      toast.error("Failed to send reset email.");
    }
  }

  return (
    <div className="min-h-[calc(100vh-120px)] bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-10">
        {/* Centered Form Card */}
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-8 sm:px-8 sm:py-9">
            {/* Icon */}
            <div className="flex justify-center mb-5">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faLock}
                  className="text-green-600 text-xl"
                />
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-xl font-semibold text-gray-900 mb-1 sm:text-2xl">
                Forgot your password?
              </h1>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                No worries. Enter your email address and we&apos;ll send you a
                link to reset your password.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              {/* Email Input */}
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
                    autoComplete="email"
                    required
                    placeholder="Your registered email address"
                    className="block w-full rounded-lg border border-gray-300 bg-white pl-10 pr-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                  {errors.email && (
                    <p className="mt-1 text-[11px] text-red-600">
                      {errors.email.message as string}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2.5 px-4 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
              >
                <FontAwesomeIcon icon={faEnvelope} className="text-xs" />
                Send Reset Link
              </button>

              {/* Back to Sign In */}
              <div className="pt-1 text-center">
                <p className="text-sm text-gray-600">
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

            {/* Security Notice */}
            <div className="mt-6 border-t border-gray-100 pt-3">
              <div className="flex items-start gap-3 rounded-lg bg-green-50 px-3 py-2.5 sm:px-4 sm:py-3">
                <FontAwesomeIcon
                  icon={faShieldHalved}
                  className="mt-0.5 text-sm text-green-600 shrink-0"
                />
                <div>
                  <h4 className="text-[11px] font-semibold text-gray-900 uppercase tracking-wide">
                    Security notice
                  </h4>
                  <p className="mt-1 text-[11px] text-gray-600 leading-relaxed">
                    For your security, password reset links are only sent to
                    your registered email address and will expire after 30
                    minutes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="w-full">
          <h2 className="text-center text-lg font-semibold text-gray-900 mb-4 sm:text-xl sm:mb-6">
            Need additional help?
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
            {/* Contact Support Card */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 flex flex-col items-center text-center shadow-sm">
              <div className="mb-3 flex items-center justify-center">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faHeadset}
                    className="text-green-600 text-xl"
                  />
                </div>
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1.5 sm:text-base">
                Contact Support
              </h3>
              <p className="text-xs text-gray-600 mb-3 sm:text-sm sm:mb-4">
                Our customer support team is available 24/7 to assist you.
              </p>
              <Link
                href="/contact"
                className="text-sm font-semibold text-green-600 hover:text-green-700 inline-flex items-center gap-1"
              >
                Contact us
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </Link>
            </div>

            {/* FAQs Card */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 flex flex-col items-center text-center shadow-sm">
              <div className="mb-3 flex items-center justify-center">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faQuestionCircle}
                    className="text-green-600 text-xl"
                  />
                </div>
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1.5 sm:text-base">
                FAQs
              </h3>
              <p className="text-xs text-gray-600 mb-3 sm:text-sm sm:mb-4">
                Find answers to frequently asked questions about your account.
              </p>
              <Link
                href="/faqs"
                className="text-sm font-semibold text-green-600 hover:text-green-700 inline-flex items-center gap-1"
              >
                View FAQs
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </Link>
            </div>

            {/* Email Not Received Card */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 flex flex-col items-center text-center shadow-sm">
              <div className="mb-3 flex items-center justify-center">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-green-600 text-xl"
                  />
                </div>
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1.5 sm:text-base">
                Email not received?
              </h3>
              <p className="text-xs text-gray-600 mb-3 sm:text-sm sm:mb-4">
                Check your spam folder or request a new reset link.
              </p>
              <Link
                href="/resend-email"
                className="text-sm font-semibold text-green-600 hover:text-green-700 inline-flex items-center gap-1"
              >
                Resend email
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
