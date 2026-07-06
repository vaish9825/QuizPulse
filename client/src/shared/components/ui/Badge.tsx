import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
}

const Badge = ({ children }: BadgeProps) => {
  return (
    <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1 text-sm text-indigo-300">
      {children}
    </span>
  );
};

export default Badge;