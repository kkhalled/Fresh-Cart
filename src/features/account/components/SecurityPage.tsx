"use client";

import { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import useChangePassword from "../hooks/useChangePassword";
import { useUnsavedChanges } from "../hooks/useUnsavedChanges";

export default function SecurityPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isDirty, setIsDirty] = useState(false);

  // Hook handles toast notifications via onSuccess callback
  const { register, handleSubmit, errors, isSubmitting } = useChangePassword(() => {
    setNewPassword("");
    setIsDirty(false);
  });

  useUnsavedChanges({ isDirty, enabled: true });

  // Password strength calculation
  const strength = useMemo(() => {
    if (!newPassword) return { score: 0, checks: { length: false, mixed: false, number: false, special: false } };

    const checks = {
      length: newPassword.length >= 8,
      mixed: /[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword),
      number: /[0-9]/.test(newPassword),
      special: /[^A-Za-z0-9]/.test(newPassword),
    };

    const score = Object.values(checks).filter(Boolean).length;
    return { score, checks };
  }, [newPassword]);

  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColors = ["", "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-emerald-500"];
  const strengthTextColors = ["", "text-red-600", "text-orange-600", "text-yellow-600", "text-emerald-600"];

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div>
        <h2 className="text-lg font-semibold text-neutral-900">Security</h2>
        <p className="text-sm text-neutral-500">
          Update your password
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Current Password */}
        <div>
          <label
            htmlFor="currentPassword"
            className="block text-sm font-medium text-neutral-700 mb-1.5"
          >
            Current password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="currentPassword"
              type={showCurrentPassword ? "text" : "password"}
              {...register("currentPassword")}
              onChange={(e) => {
                register("currentPassword").onChange(e);
                setIsDirty(true);
              }}
              className={`
                w-full px-3 py-2 pr-10 text-sm bg-white border rounded-lg
                focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500
                transition-colors
                ${errors.currentPassword ? "border-red-400" : "border-neutral-300"}
              `}
              placeholder="Enter current password"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
            >
              <FontAwesomeIcon
                icon={showCurrentPassword ? faEyeSlash : faEye}
                className="w-4 h-4"
              />
            </button>
          </div>
          {errors.currentPassword && (
            <p className="mt-1 text-xs text-red-500">{errors.currentPassword.message}</p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-neutral-700 mb-1.5"
          >
            New password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="password"
              type={showNewPassword ? "text" : "password"}
              {...register("password")}
              onChange={(e) => {
                register("password").onChange(e);
                setNewPassword(e.target.value);
                setIsDirty(true);
              }}
              className={`
                w-full px-3 py-2 pr-10 text-sm bg-white border rounded-lg
                focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500
                transition-colors
                ${errors.password ? "border-red-400" : "border-neutral-300"}
              `}
              placeholder="Enter new password"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
            >
              <FontAwesomeIcon
                icon={showNewPassword ? faEyeSlash : faEye}
                className="w-4 h-4"
              />
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
          )}

          {/* Password Strength */}
          {newPassword && (
            <div className="mt-3 space-y-2">
              {/* Strength Bar */}
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${strengthColors[strength.score]}`}
                    style={{ width: `${(strength.score / 4) * 100}%` }}
                  />
                </div>
                <span className={`text-xs font-medium ${strengthTextColors[strength.score]}`}>
                  {strengthLabels[strength.score]}
                </span>
              </div>

              {/* Requirements Checklist */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                <CheckItem checked={strength.checks.length} label="8+ characters" />
                <CheckItem checked={strength.checks.mixed} label="Mixed case" />
                <CheckItem checked={strength.checks.number} label="Number" />
                <CheckItem checked={strength.checks.special} label="Special char" />
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="rePassword"
            className="block text-sm font-medium text-neutral-700 mb-1.5"
          >
            Confirm password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="rePassword"
              type={showConfirmPassword ? "text" : "password"}
              {...register("rePassword")}
              onChange={(e) => {
                register("rePassword").onChange(e);
                setIsDirty(true);
              }}
              className={`
                w-full px-3 py-2 pr-10 text-sm bg-white border rounded-lg
                focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500
                transition-colors
                ${errors.rePassword ? "border-red-400" : "border-neutral-300"}
              `}
              placeholder="Confirm new password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
            >
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
                className="w-4 h-4"
              />
            </button>
          </div>
          {errors.rePassword && (
            <p className="mt-1 text-xs text-red-500">{errors.rePassword.message}</p>
          )}
        </div>

        {/* Divider */}
        <div className="pt-2">
          <div className="border-t border-neutral-200" />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !isDirty}
            className="
              px-4 py-2 text-sm font-medium rounded-lg transition-all
              bg-emerald-600 text-white hover:bg-emerald-700
              disabled:opacity-50 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:ring-offset-2
            "
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4"
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
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Changing...
              </span>
            ) : (
              "Change password"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

function CheckItem({ checked, label }: { checked: boolean; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <FontAwesomeIcon
        icon={checked ? faCheck : faXmark}
        className={`w-3 h-3 ${checked ? "text-emerald-500" : "text-neutral-300"}`}
      />
      <span className={`text-xs ${checked ? "text-neutral-700" : "text-neutral-400"}`}>
        {label}
      </span>
    </div>
  );
}
