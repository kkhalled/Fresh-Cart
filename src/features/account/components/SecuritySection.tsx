"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faLock } from "@fortawesome/free-solid-svg-icons";
import useChangePassword from "../hooks/useChangePassword";
import PasswordStrengthMeter from "./PasswordStrengthMeter";
import { useUnsavedChanges } from "../hooks/useUnsavedChanges";
import { copyStrings } from "../design/designSystem";

export default function SecuritySection() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isDirty, setIsDirty] = useState(false);

  const { register, handleSubmit, errors, isSubmitting } = useChangePassword(() => {
    setNewPassword("");
    setIsDirty(false);
  });

  useUnsavedChanges({ isDirty, enabled: true });

  const handlePasswordChange = (value: string) => {
    setNewPassword(value);
    setIsDirty(true);
  };

  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-neutral-200 bg-neutral-50">
        <h2 className="text-xl font-bold text-neutral-900">
          {copyStrings.security.sectionTitle}
        </h2>
        <p className="text-sm text-neutral-600 mt-1">
          {copyStrings.security.sectionDescription}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6">
        <div className="space-y-6">
          {/* Current Password */}
          <div>
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-neutral-700 mb-2"
            >
              {copyStrings.security.currentPasswordLabel}{" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                <FontAwesomeIcon icon={faLock} className="w-5 h-5" />
              </div>
              <input
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                {...register("currentPassword")}
                onChange={(e) => {
                  register("currentPassword").onChange(e);
                  setIsDirty(true);
                }}
                className={`w-full pl-11 pr-12 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${
                  errors.currentPassword
                    ? "border-red-500"
                    : "border-neutral-300"
                }`}
                placeholder={copyStrings.security.currentPasswordPlaceholder}
                aria-invalid={!!errors.currentPassword}
                aria-describedby={
                  errors.currentPassword ? "currentPassword-error" : undefined
                }
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                aria-label={showCurrentPassword ? "Hide password" : "Show password"}
              >
                <FontAwesomeIcon
                  icon={showCurrentPassword ? faEyeSlash : faEye}
                  className="w-5 h-5"
                />
              </button>
            </div>
            {errors.currentPassword && (
              <p
                id="currentPassword-error"
                className="mt-1.5 text-sm text-red-600"
              >
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-neutral-700 mb-2"
            >
              {copyStrings.security.newPasswordLabel}{" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                <FontAwesomeIcon icon={faLock} className="w-5 h-5" />
              </div>
              <input
                id="password"
                type={showNewPassword ? "text" : "password"}
                {...register("password")}
                onChange={(e) => {
                  register("password").onChange(e);
                  handlePasswordChange(e.target.value);
                }}
                className={`w-full pl-11 pr-12 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${
                  errors.password ? "border-red-500" : "border-neutral-300"
                }`}
                placeholder={copyStrings.security.newPasswordPlaceholder}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                aria-label={showNewPassword ? "Hide password" : "Show password"}
              >
                <FontAwesomeIcon
                  icon={showNewPassword ? faEyeSlash : faEye}
                  className="w-5 h-5"
                />
              </button>
            </div>
            {errors.password && (
              <p id="password-error" className="mt-1.5 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}

            {/* Password Strength Meter */}
            <PasswordStrengthMeter password={newPassword} />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="rePassword"
              className="block text-sm font-medium text-neutral-700 mb-2"
            >
              {copyStrings.security.confirmPasswordLabel}{" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                <FontAwesomeIcon icon={faLock} className="w-5 h-5" />
              </div>
              <input
                id="rePassword"
                type={showConfirmPassword ? "text" : "password"}
                {...register("rePassword")}
                onChange={(e) => {
                  register("rePassword").onChange(e);
                  setIsDirty(true);
                }}
                className={`w-full pl-11 pr-12 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${
                  errors.rePassword ? "border-red-500" : "border-neutral-300"
                }`}
                placeholder={copyStrings.security.confirmPasswordPlaceholder}
                aria-invalid={!!errors.rePassword}
                aria-describedby={
                  errors.rePassword ? "rePassword-error" : undefined
                }
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                <FontAwesomeIcon
                  icon={showConfirmPassword ? faEyeSlash : faEye}
                  className="w-5 h-5"
                />
              </button>
            </div>
            {errors.rePassword && (
              <p id="rePassword-error" className="mt-1.5 text-sm text-red-600">
                {errors.rePassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-neutral-200">
            <button
              type="submit"
              disabled={isSubmitting || !isDirty}
              className="w-full px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 active:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {copyStrings.security.changingButton}
                </span>
              ) : (
                copyStrings.security.changeButton
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
