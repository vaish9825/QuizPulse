import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({
  className = "",
  ...props
}: InputProps) {
  return (
    <input
      className={`w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none ${className}`}
      {...props}
    />
  );
}