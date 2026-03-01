"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import useUpdateProfile from "../hooks/useUpdateProfile";
import ChangeEmailModal from "./ChangeEmailModal";
import { useUnsavedChanges } from "../hooks/useUnsavedChanges";
import { copyStrings } from "../design/designSystem";

export default function ProfileSection() {
  const { register, handleSubmit, errors, isSubmitting, userInfo } =
    useUpdateProfile();
  
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [formValues, setFormValues] = useState({
    name: userInfo?.name || "",
    phone: "",
  });

  useUnsavedChanges({ isDirty, enabled: true });

  useEffect(() => {
    if (userInfo?.name) {
      setFormValues((prev) => ({ ...prev, name: userInfo.name }));
    }
  }, [userInfo]);

  const handleFieldChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const onSubmit = async (data: any) => {
    await handleSubmit();
    setIsDirty(false);
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-neutral-200 bg-neutral-50">
          <h2 className="text-xl font-bold text-neutral-900">
            {copyStrings.profile.sectionTitle}
          </h2>
          <p className="text-sm text-neutral-600 mt-1">
            {copyStrings.profile.sectionDescription}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                {copyStrings.profile.nameLabel}{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                  <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
                </div>
                <input
                  id="name"
                  type="text"
                  {...register("name")}
                  onChange={(e) => {
                    register("name").onChange(e);
                    handleFieldChange("name", e.target.value);
                  }}
                  className={`w-full pl-11 pr-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${
                    errors.name ? "border-red-500" : "border-neutral-300"
                  }`}
                  placeholder={copyStrings.profile.namePlaceholder}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
              </div>
              {errors.name && (
                <p id="name-error" className="mt-1.5 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email (Read-only with Edit trigger) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-neutral-700">
                  {copyStrings.profile.emailLabel}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setIsEmailModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-teal-600 hover:bg-teal-50 rounded-lg transition-all"
                >
                  <FontAwesomeIcon icon={faPencil} className="w-3.5 h-3.5" />
                  {copyStrings.profile.emailEditButton}
                </button>
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                  <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={userInfo?.email || ""}
                  readOnly
                  className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-600 cursor-default"
                />
              </div>
              <p className="mt-1.5 text-sm text-neutral-500">
                {copyStrings.profile.emailReadonlyHelper}
              </p>
            </div>

            {/* Phone (Optional) */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                {copyStrings.profile.phoneLabel}{" "}
                <span className="text-neutral-400 text-sm font-normal">
                  (Optional)
                </span>
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                  <FontAwesomeIcon icon={faPhone} className="w-5 h-5" />
                </div>
                <input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  onChange={(e) => {
                    register("phone").onChange(e);
                    handleFieldChange("phone", e.target.value);
                  }}
                  className={`w-full pl-11 pr-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${
                    errors.phone ? "border-red-500" : "border-neutral-300"
                  }`}
                  placeholder={copyStrings.profile.phonePlaceholder}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                />
              </div>
              {errors.phone ? (
                <p id="phone-error" className="mt-1.5 text-sm text-red-600">
                  {errors.phone.message}
                </p>
              ) : (
                <p className="mt-1.5 text-sm text-neutral-500">
                  {copyStrings.profile.phoneHelper}
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
                    {copyStrings.profile.savingButton}
                  </span>
                ) : (
                  copyStrings.profile.saveButton
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Email Change Modal */}
      <ChangeEmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        currentEmail={userInfo?.email || ""}
      />
    </>
  );
}
