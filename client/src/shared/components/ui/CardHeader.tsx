import type { ReactNode } from "react";

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function CardHeader({
  title,
  subtitle,
  action,
}: CardHeaderProps) {
  return (
    <div className="mb-8 flex items-start justify-between">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-2 text-slate-500">
            {subtitle}
          </p>
        )}
      </div>

      {action}
    </div>
  );
}