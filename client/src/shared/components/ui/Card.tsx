import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({
  children,
  className = "",
  hover = true,
}: CardProps) {
  return (
    <div
      className={`
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-8
        shadow-sm
        transition-all
        duration-300

        ${
          hover
            ? "hover:-translate-y-1 hover:shadow-xl"
            : ""
        }

        ${className}
      `}
    >
      {children}
    </div>
  );
}