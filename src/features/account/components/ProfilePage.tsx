"use client";

import { useState } from "react";
import useUpdateProfile from "../hooks/useUpdateProfile";
import { useUnsavedChanges } from "../hooks/useUnsavedChanges";

export default function ProfilePage() {
  const { register, handleSubmit, errors, isSubmitting, userInfo } =
    useUpdateProfile();

  const [isDirty, setIsDirty] = useState(false);

  useUnsavedChanges({ isDirty, enabled: true });

  // Form submission handled by hook (includes toast)
  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit(e);
    setIsDirty(false);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div>
        <h2 className="text-lg font-semibold text-neutral-900">Profile</h2>
        <p className="text-sm text-neutral-500">
          Your personal information
        </p>
      </div>

      {/* Form */}
      <form onSubmit={onFormSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-neutral-700 mb-1.5"
          >
            Full name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            onChange={(e) => {
              register("name").onChange(e);
              setIsDirty(true);
            }}
            className={`
              w-full px-3 py-2 text-sm bg-white border rounded-lg
              focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500
              transition-colors
              ${errors.name ? "border-red-400" : "border-neutral-300"}
            `}
            placeholder="Your full name"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-neutral-700 mb-1.5"
          >
            Email address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            onChange={(e) => {
              register("email").onChange(e);
              setIsDirty(true);
            }}
            className={`
              w-full px-3 py-2 text-sm bg-white border rounded-lg
              focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500
              transition-colors
              ${errors.email ? "border-red-400" : "border-neutral-300"}
            `}
            placeholder="Your email address"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-neutral-700 mb-1.5"
          >
            Phone number{" "}
            <span className="text-neutral-400 font-normal">(optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            {...register("phone")}
            onChange={(e) => {
              register("phone").onChange(e);
              setIsDirty(true);
            }}
            className={`
              w-full px-3 py-2 text-sm bg-white border rounded-lg
              focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500
              transition-colors
              ${errors.phone ? "border-red-400" : "border-neutral-300"}
            `}
            placeholder="+1 (555) 000-0000"
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {/* Divider */}
        <div className="pt-2">
          <div className="border-t border-neutral-200" />
        </div>

        {/* Save Button */}
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
                Saving...
              </span>
            ) : (
              "Save changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
