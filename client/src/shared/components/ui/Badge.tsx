import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "primary" | "success" | "warning" | "danger";
}

export function Badge({
  children,
  variant = "primary",
}: BadgeProps) {
  const variants = {
    primary:
      "bg-indigo-50 text-indigo-700 border border-indigo-200",

    success:
      "bg-emerald-50 text-emerald-700 border border-emerald-200",

    warning:
      "bg-amber-50 text-amber-700 border border-amber-200",

    danger:
      "bg-red-50 text-red-700 border border-red-200",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        ${variants[variant]}
      `}
    >
      {children}
    </span>
  );
}