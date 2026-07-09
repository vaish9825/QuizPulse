import type { ReactNode } from "react";

interface HeroProps {
  title: string;
  subtitle: string;
  actions?: ReactNode;
}

export function Hero({
  title,
  subtitle,
  actions,
}: HeroProps) {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-indigo-600 to-violet-700 px-10 py-14 text-white shadow-xl">
      <div className="max-w-3xl">
        <h1 className="text-5xl font-bold tracking-tight">
          {title}
        </h1>

        <p className="mt-5 text-lg leading-8 text-indigo-100">
          {subtitle}
        </p>

        {actions && (
          <div className="mt-8 flex flex-wrap gap-4">
            {actions}
          </div>
        )}
      </div>
    </section>
  );
}