"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import {
  faUserPlus,
  faEnvelope,
  faLock,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FormInput } from "../../../../components/ui/FormInput";
import { SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpInputValues, SignUpSchema } from "../../schemas/SignUp.schema";
import { signupAction } from "../../server/signup.action";

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      terms: false,
    },
    // resolver: zodResolver(SignUpSchema),
  });

  async function onSubmit(values: SignUpInputValues) {
    signupAction(values);
  }

  return (
    /*
      RIGHT PANEL — fills the full column height with its own background.
      No more plain white void. The form card sits centered inside.
    */
    <div className="relative w-1/1 h-full flex items-center justify-center overflow-hidden bg-[#f5f4f0]">
      {/* Subtle dot-grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Soft green glow bleed from the left edge — ties the two panels together */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(5,150,105,0.06), transparent)",
        }}
      />

      {/* Top-right warm accent */}
      <div
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)",
        }}
      />

      {/* ── Card ── */}
      <div
        className="relative z-10 w-full max-w-[550px] mx-auto px-5"
        style={{
          animation: "fc-slide-up .6s cubic-bezier(.16,1,.3,1) .1s both",
        }}
      >
        <style>{`
          @keyframes fc-slide-up { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
          @keyframes fc-shimmer  { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
          .fc-submit-btn::after {
            content:''; position:absolute; inset:0;
            background:linear-gradient(105deg,transparent 30%,rgba(255,255,255,.18) 50%,transparent 70%);
            transform:translateX(-100%);
          }
          .fc-submit-btn:hover::after { animation:fc-shimmer .65s ease forwards; }
        `}</style>

        <div className="bg-white rounded-2xl shadow-xl shadow-black/[0.08] border border-gray-100 px-6 py-6">
          {/* Header */}
          <div className="text-center mb-5">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg shadow-emerald-500/25 mb-2.5">
              <FontAwesomeIcon
                icon={faUserPlus}
                className="text-white text-sm"
              />
            </div>
            <h2 className="text-[19px] font-bold text-gray-900 tracking-tight">
              Create Account
            </h2>
            <p className="text-gray-400 text-[11px] mt-0.5">
              Start your fresh groceries journey today
            </p>
          </div>

          {/* Social */}
          <div className="flex gap-2.5 mb-4">
            {[
              { icon: faGoogle, label: "Google", iconCls: "text-red-500" },
              { icon: faFacebook, label: "Facebook", iconCls: "text-blue-500" },
            ].map(({ icon, label, iconCls }) => (
              <button
                key={label}
                type="button"
                className="group flex-1 flex items-center justify-center gap-1.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-[11px] font-semibold hover:border-gray-300 hover:bg-gray-100 transition-all duration-200"
              >
                <FontAwesomeIcon
                  icon={icon}
                  className={`${iconCls} text-xs group-hover:scale-110 transition-transform duration-200`}
                />
                {label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-white text-[9px] text-gray-400 font-bold uppercase tracking-[0.14em]">
                or continue with email
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5">
            {/* Full Name */}
            <div>
              <FormInput
                label="Full Name"
                type="text"
                placeholder="Your full name"
                leftIcon={
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-gray-300 text-[10px]"
                  />
                }
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-[10px] mt-0.5 ml-0.5">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <FormInput
                  label="Email"
                  type="email"
                  placeholder="you@email.com"
                  leftIcon={
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="text-gray-300 text-[10px]"
                    />
                  }
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-[10px] mt-0.5 ml-0.5">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <FormInput
                  label="Phone"
                  type="tel"
                  placeholder="+20 1XXXXXXXX"
                  leftIcon={
                    <FontAwesomeIcon
                      icon={faPhone}
                      className="text-gray-300 text-[9px]"
                    />
                  }
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="text-red-500 text-[10px] mt-0.5 ml-0.5">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            {/* Password + Confirm */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <FormInput
                  label="Password"
                  type="password"
                  placeholder="Min. 8 chars"
                  leftIcon={
                    <FontAwesomeIcon
                      icon={faLock}
                      className="text-gray-300 text-[9px]"
                    />
                  }
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500 text-[10px] mt-0.5 ml-0.5">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div>
                <FormInput
                  label="Confirm"
                  type="password"
                  placeholder="Re-enter"
                  leftIcon={
                    <FontAwesomeIcon
                      icon={faLock}
                      className="text-gray-300 text-[9px]"
                    />
                  }
                  {...register("rePassword")}
                />
                {errors.rePassword && (
                  <p className="text-red-500 text-[10px] mt-0.5 ml-0.5">
                    {errors.rePassword.message}
                  </p>
                )}
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-center gap-2 cursor-pointer group pt-0.5">
              <input
                type="checkbox"
                className="w-3.5 h-3.5 accent-green-600 cursor-pointer rounded"
                {...register("terms")}
              />
              <span className="text-[10px] text-gray-400 group-hover:text-gray-600 transition-colors leading-relaxed">
                I agree to FreshCart&apos;s{" "}
                <a
                  href="#"
                  className="text-green-600 font-semibold hover:underline"
                >
                  Terms
                </a>{" "}
                &{" "}
                <a
                  href="#"
                  className="text-green-600 font-semibold hover:underline"
                >
                  Privacy Policy
                </a>
              </span>
            </label>
            {errors.terms && (
              <p className="text-red-500 text-[10px] ml-0.5">
                {errors.terms.message}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="fc-submit-btn group relative w-full bg-linear-to-r from-green-600 via-emerald-500 to-green-600 bg-[length:200%_100%] text-white py-[10px] rounded-xl font-semibold text-[12.5px] hover:bg-right transition-all duration-500 flex items-center justify-center gap-2 shadow-lg shadow-green-600/20 hover:shadow-xl hover:shadow-green-600/30 active:scale-[0.98] overflow-hidden !mt-3"
            >
              <span className="relative z-10">Create Account</span>
              <FontAwesomeIcon
                icon={faUserPlus}
                className="text-[10px] relative z-10 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300"
              />
            </button>
          </form>

          {/* Sign in */}
          <p className="text-center text-[10.5px] text-gray-400 mt-3.5">
            Already have an account?{" "}
            <a
              href="#"
              className="text-green-600 font-bold hover:text-green-700 transition-colors"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
