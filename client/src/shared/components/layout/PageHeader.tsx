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
    <div className="mb-12 flex flex-col items-start justify-between gap-6 border-b border-slate-200 pb-8 md:flex-row md:items-end">

      <div>

        <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
          QuizPulse
        </span>

        <h1 className="mt-4 text-5xl font-bold tracking-tight text-slate-900">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            {subtitle}
          </p>
        )}

      </div>

      {action && (
        <div className="flex shrink-0 items-center">
          {action}
        </div>
      )}

    </div>
  );
}