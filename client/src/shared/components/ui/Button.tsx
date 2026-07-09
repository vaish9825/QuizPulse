import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  className = "",
  children,
  disabled,
  ...props
}: ButtonProps) {
  const base = `
    inline-flex items-center justify-center gap-2
    rounded-2xl
    font-semibold
    transition-all duration-200
    select-none
    focus:outline-none
    focus:ring-4
    disabled:cursor-not-allowed
    disabled:opacity-60
    active:scale-[0.98]
  `;

  const sizes = {
    sm: "h-10 px-4 text-sm",
    md: "h-12 px-6 text-sm",
    lg: "h-14 px-8 text-base",
  };

  const variants = {
    primary: `
      bg-indigo-600
      text-white
      hover:bg-indigo-700
      hover:shadow-lg
      focus:ring-indigo-200
    `,

    secondary: `
      bg-slate-100
      text-slate-900
      hover:bg-slate-200
      focus:ring-slate-200
    `,

    outline: `
      border
      border-slate-300
      bg-white
      text-slate-800
      hover:bg-slate-50
      focus:ring-slate-200
    `,

    danger: `
      bg-red-600
      text-white
      hover:bg-red-700
      hover:shadow-lg
      focus:ring-red-200
    `,
  };

  return (
    <button
      disabled={disabled || loading}
      className={`
        ${base}
        ${sizes[size]}
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
              opacity="0.2"
            />

            <path
              d="M22 12a10 10 0 0 1-10 10"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          Loading...
        </>
      ) : (
        <>
          {leftIcon}

          {children}

          {rightIcon}
        </>
      )}
    </button>
  );
}