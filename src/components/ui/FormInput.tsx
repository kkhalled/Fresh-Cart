import React, { forwardRef, InputHTMLAttributes } from "react";

type FormInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label?: string;
  name: string;
  helperText?: string;
  error?: string | boolean;
  leftIcon?: React.ReactNode;
  className?: string;
};

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      label,
      name,
      helperText,
      error,
      leftIcon,
      className = "",
      placeholder = "",
      type = "text",
      ...rest
    },
    ref
  ) => {
    const describedBy = helperText ? `${name}-helper` : undefined;

    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label
            htmlFor={name}
            className="block text-[10px] font-semibold text-gray-400 mb-1 uppercase tracking-[0.08em]"
          >
            {label}
          </label>
        )}

        <div className="relative group">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-green-500 transition-colors duration-200">
              {leftIcon}
            </div>
          )}

          <input
            id={name}
            name={name}
            type={type}
            ref={ref}
            placeholder={placeholder}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            className={`w-full px-3 py-[8px] border rounded-xl text-gray-900 text-[13px] placeholder:text-gray-300 focus:outline-none transition-all duration-200 bg-gray-50/50 focus:bg-white ${leftIcon ? "pl-9" : "pl-3"
              } ${error
                ? "border-red-300 focus:ring-2 focus:ring-red-500/15 focus:border-red-400"
                : "border-gray-200 focus:ring-2 focus:ring-green-500/15 focus:border-green-500 hover:border-gray-300"
              }`}
            {...rest}
          />
        </div>

        {helperText && (
          <p
            id={`${name}-helper`}
            className={`mt-0.5 text-[10px] ${error ? "text-red-500" : "text-gray-400"
              }`}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
