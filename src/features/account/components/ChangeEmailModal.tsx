"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faTimes, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { componentSpecs, copyStrings } from "../design/designSystem";

interface ChangeEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentEmail: string;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, duration: 0.3 },
  },
  exit: { opacity: 0, scale: 0.95, y: 20 },
};

export default function ChangeEmailModal({
  isOpen,
  onClose,
  currentEmail,
}: ChangeEmailModalProps) {
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ newEmail?: string; password?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors: { newEmail?: string; password?: string } = {};
    if (!newEmail) {
      newErrors.newEmail = copyStrings.validation.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
      newErrors.newEmail = copyStrings.validation.emailInvalid;
    } else if (newEmail === currentEmail) {
      newErrors.newEmail = "New email must be different from current email";
    }
    if (!password) {
      newErrors.password = copyStrings.validation.currentPasswordRequired;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // TODO: Implement email change API call
      // await changeEmailRequest({ newEmail, password });
      
      toast.success(copyStrings.emailChange.successToast, {
        autoClose: 3000,
      });
      
      // Show pending verification message
      toast.info(copyStrings.emailChange.pendingMessage, {
        autoClose: 5000,
      });
      
      setNewEmail("");
      setPassword("");
      onClose();
    } catch (error: any) {
      toast.error(error?.message || copyStrings.emailChange.errorToast);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">
                    {copyStrings.emailChange.modalTitle}
                  </h2>
                  <p className="text-sm text-neutral-600 mt-1">
                    {copyStrings.emailChange.modalDescription}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors"
                  aria-label="Close modal"
                  disabled={isSubmitting}
                >
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="w-5 h-5 text-neutral-500"
                  />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Current Email (read-only) */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Current Email
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                      <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5" />
                    </div>
                    <input
                      type="email"
                      value={currentEmail}
                      readOnly
                      className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-600 cursor-default"
                    />
                  </div>
                </div>

                {/* New Email */}
                <div>
                  <label
                    htmlFor="newEmail"
                    className="block text-sm font-medium text-neutral-700 mb-2"
                  >
                    {copyStrings.emailChange.newEmailLabel} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                      <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5" />
                    </div>
                    <input
                      id="newEmail"
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className={`w-full pl-11 pr-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${
                        errors.newEmail
                          ? "border-red-500"
                          : "border-neutral-300"
                      }`}
                      placeholder={copyStrings.emailChange.newEmailPlaceholder}
                      disabled={isSubmitting}
                      aria-invalid={!!errors.newEmail}
                      aria-describedby={errors.newEmail ? "newEmail-error" : undefined}
                    />
                  </div>
                  {errors.newEmail && (
                    <p id="newEmail-error" className="mt-1.5 text-sm text-red-600">
                      {errors.newEmail}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-neutral-700 mb-2"
                  >
                    {copyStrings.emailChange.passwordLabel} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                      <FontAwesomeIcon icon={faLock} className="w-5 h-5" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full pl-11 pr-12 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${
                        errors.password
                          ? "border-red-500"
                          : "border-neutral-300"
                      }`}
                      placeholder={copyStrings.emailChange.passwordPlaceholder}
                      disabled={isSubmitting}
                      aria-invalid={!!errors.password}
                      aria-describedby={errors.password ? "password-error" : undefined}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                      disabled={isSubmitting}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        className="w-5 h-5"
                      />
                    </button>
                  </div>
                  {errors.password && (
                    <p id="password-error" className="mt-1.5 text-sm text-red-600">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Info Message */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    A verification email will be sent to your new address. Your current email will remain active until you confirm the change.
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-neutral-100 text-neutral-700 font-medium rounded-lg hover:bg-neutral-200 active:bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {copyStrings.emailChange.cancelButton}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 active:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                        Sending...
                      </span>
                    ) : (
                      copyStrings.emailChange.submitButton
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
