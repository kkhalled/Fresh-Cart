"use client";

import { useMemo } from "react";
import { copyStrings } from "../design/designSystem";

interface PasswordStrengthMeterProps {
  password: string;
}

export default function PasswordStrengthMeter({
  password,
}: PasswordStrengthMeterProps) {
  const strength = useMemo(() => {
    const checks = {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      special: false,
    };

    if (!password) return { score: 0, label: "", color: "", checks };

    let score = 0;
    checks.length = password.length >= 6;
    checks.uppercase = /[A-Z]/.test(password);
    checks.lowercase = /[a-z]/.test(password);
    checks.number = /[0-9]/.test(password);
    checks.special = /[^A-Za-z0-9]/.test(password);

    if (checks.length) score++;
    if (checks.uppercase && checks.lowercase) score++;
    if (checks.number) score++;
    if (checks.special) score++;

    const labels = ["", "Weak", "Fair", "Good", "Strong"];
    const colors = [
      "",
      "bg-red-500",
      "bg-orange-500",
      "bg-yellow-500",
      "bg-green-500",
    ];

    return { score, label: labels[score], color: colors[score], checks };
  }, [password]);

  if (!password) return null;

  return (
    <div className="mt-3 space-y-3">
      {/* Strength Bar */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-neutral-700">
            Password Strength
          </span>
          <span
            className={`text-sm font-semibold ${
              strength.score === 1
                ? "text-red-600"
                : strength.score === 2
                ? "text-orange-600"
                : strength.score === 3
                ? "text-yellow-600"
                : "text-green-600"
            }`}
          >
            {strength.label}
          </span>
        </div>
        <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${strength.color}`}
            style={{ width: `${(strength.score / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Requirements Checklist */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-neutral-700">
          Password must contain:
        </p>
        <ul className="space-y-1.5">
          <li
            className={`flex items-center gap-2 text-sm ${
              strength.checks.length
                ? "text-green-600"
                : "text-neutral-500"
            }`}
          >
            <svg
              className="w-4 h-4 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {strength.checks.length ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              ) : (
                <circle cx="12" cy="12" r="10" strokeWidth={2} />
              )}
            </svg>
            At least 6 characters long
          </li>
          <li
            className={`flex items-center gap-2 text-sm ${
              strength.checks.uppercase && strength.checks.lowercase
                ? "text-green-600"
                : "text-neutral-500"
            }`}
          >
            <svg
              className="w-4 h-4 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {strength.checks.uppercase && strength.checks.lowercase ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              ) : (
                <circle cx="12" cy="12" r="10" strokeWidth={2} />
              )}
            </svg>
            Uppercase and lowercase letters
          </li>
          <li
            className={`flex items-center gap-2 text-sm ${
              strength.checks.number
                ? "text-green-600"
                : "text-neutral-500"
            }`}
          >
            <svg
              className="w-4 h-4 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {strength.checks.number ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              ) : (
                <circle cx="12" cy="12" r="10" strokeWidth={2} />
              )}
            </svg>
            At least one number
          </li>
          <li
            className={`flex items-center gap-2 text-sm ${
              strength.checks.special
                ? "text-green-600"
                : "text-neutral-500"
            }`}
          >
            <svg
              className="w-4 h-4 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {strength.checks.special ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              ) : (
                <circle cx="12" cy="12" r="10" strokeWidth={2} />
              )}
            </svg>
            At least one special character
          </li>
        </ul>
      </div>
    </div>
  );
}
