import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
}

export function Badge({
  children,
}: BadgeProps) {
  return (
    <span className="rounded-full bg-indigo-600/20 px-3 py-1 text-xs font-medium text-indigo-300">
      {children}
    </span>
  );
}