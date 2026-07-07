import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  action,
}: PageHeaderProps) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold text-white">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-2 text-slate-400">
            {subtitle}
          </p>
        )}
      </div>

      {action}
    </div>
  );
}