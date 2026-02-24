"use client";

import { FormInput } from "@/src/components/ui/FormInput";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLock,
  faArrowRight,
  faSpinner,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../assets/freshcart-logo.svg";
import { SignInInputValues, SignInSchema } from "../../schemas/Signin.schema";
import signinAction from "../../server/signin.action";
import setToken from "../../server/auth.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { setAuthenticated } from "../../store/authSlice";
import { useDispatch } from "react-redux";

import { useState } from "react";

export default function SigninForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    defaultValues: { email: "", password: "", rememberMe: false },
    resolver: zodResolver(SignInSchema),
    mode: "onSubmit",
  });

  async function onSubmit(values: SignInInputValues) {
    try {
      // TODO: replace with your signinAction
      const response = await signinAction(values);
      console.log(values);
      if (response?.success) {
        await setToken(response.data.token, values.rememberMe ?? false);
        dispatch(
          setAuthenticated({
            isAuthenticated: true,
            userInfo: response.data.user,
          }),
        );
        toast.success("Signed in successfully!", { autoClose: 1800 });
        console.log(response.data);
        setTimeout(() => router.push("/"), 1900);
      } else {
        toast.error(response?.message || "Signin failed.");
        if (response?.errors) {
          Object.keys(response.errors).forEach((key) => {
            setError(key as keyof SignInInputValues, {
              message: response.errors[key],
            });
          });
        }
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");

      console.log(error);
    }
  }

  return (
    // ↓ CHANGED: same warm cream gradient as hero
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Card */}
      <div
        className="relative z-10 w-full max-w-125 mx-auto px-5"
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

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl shadow-black/[0.07] border border-gray-200/60 px-6 py-6">
          {/* Header */}
          <div className="text-center mb-5">
            <div className="inline-flex items-center justify-center mb-2.5">
              <Image src={logo} alt="FreshCart" width={150} />
            </div>
            <h2 className="text-[19px] font-bold text-gray-900 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-gray-400 text-[11px] mt-0.5">
              Sign in to continue your fresh shopping experience
            </p>
          </div>

          {/* Social */}
          <div className="flex gap-2.5 mb-4">
            {[
              { icon: faGoogle, label: "Google", cls: "text-red-500" },
              { icon: faFacebook, label: "Facebook", cls: "text-blue-500" },
            ].map(({ icon, label, cls }) => (
              <button
                key={label}
                type="button"
                className="group flex-1 flex items-center justify-center gap-1.5 py-2 bg-white/70 border border-gray-200 rounded-xl text-gray-700 text-[11px] font-semibold hover:border-gray-300 hover:bg-white transition-all duration-200"
              >
                <FontAwesomeIcon
                  icon={icon}
                  className={`${cls} text-xs group-hover:scale-110 transition-transform duration-200`}
                />
                {label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200/70" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-white/80 text-[9px] text-gray-400 font-bold uppercase tracking-[0.14em]">
                or continue with email
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5">
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
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-[10px] mt-0.5 ml-0.5">
                  {errors.email.message as string}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
                  Password
                </span>
                <Link
                  href="/forgot-password"
                  className="text-[10px] text-green-600 font-semibold hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <FormInput
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  leftIcon={
                    <FontAwesomeIcon
                      icon={faLock}
                      className="text-gray-300 text-[9px]"
                    />
                  }
                  {...register("password", { required: "Password is required" })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    className="text-xs"
                  />
                </button>
              </div>
              
              {errors.password && (
                <p className="text-red-500 text-[10px] mt-0.5 ml-0.5">
                  {errors.password.message as string}
                </p>
              )}
            </div>
            {/* remember me */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  type="checkbox"
                  {...register("rememberMe")}
                  className="h-3 w-3 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 block text-[10px] text-gray-600 font-medium"
                >
                  Remember me
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="fc-submit-btn group  relative w-full bg-linear-to-r from-green-600 via-emerald-500 to-green-600 bg-size-[200%_100%] text-white py-2.5 rounded-xl font-semibold text-[12.5px] hover:bg-right transition-all duration-500 flex items-center justify-center gap-2 shadow-lg shadow-green-600/20 hover:shadow-xl hover:shadow-green-600/30 active:scale-[0.98] overflow-hidden mt-3! disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span className="relative z-10">Sign In</span>
              {isSubmitting ? (
                <FontAwesomeIcon
                  icon={faSpinner}
                  spin
                  className="text-[10px]"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-[10px] relative z-10 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300"
                />
              )}
            </button>
          </form>

          <p className="text-center text-[10.5px] text-gray-400 mt-3.5">
            New to FreshCart?{" "}
            <Link
              href="/signup"
              className="text-green-600 font-bold hover:text-green-700 transition-colors"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
