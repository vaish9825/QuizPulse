import type { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-indigo-600 text-white hover:bg-indigo-500",

        secondary:
          "border border-slate-700 text-white hover:border-indigo-500",

        ghost:
          "text-slate-300 hover:bg-slate-800",
      },

      size: {
        sm: "h-9 px-3",
        md: "h-11 px-5",
        lg: "h-12 px-8",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

const Button = ({
  variant,
  size,
  className,
  ...props
}: ButtonProps) => (
  <button
    className={clsx(buttonVariants({ variant, size }), className)}
    {...props}
  />
);

export default Button;