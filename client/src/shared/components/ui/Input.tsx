import type {
  InputHTMLAttributes,
  ReactNode,
} from "react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export function Input({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}

      <div
        className={`
          flex items-center gap-3
          rounded-2xl
          border
          bg-white
          px-4
          py-3
          shadow-sm
          transition-all
          duration-200

          ${
            error
              ? "border-red-400 focus-within:border-red-500"
              : "border-slate-300 focus-within:border-indigo-500"
          }

          focus-within:ring-4
          ${
            error
              ? "focus-within:ring-red-100"
              : "focus-within:ring-indigo-100"
          }
        `}
      >
        {leftIcon}

        <input
          className={`
            w-full
            bg-transparent
            text-slate-900
            placeholder:text-slate-400
            outline-none
            ${className}
          `}
          {...props}
        />

        {rightIcon}
      </div>

      {error ? (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      ) : helperText ? (
        <p className="mt-2 text-sm text-slate-500">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}