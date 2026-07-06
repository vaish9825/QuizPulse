import type { ReactNode } from "react";
import clsx from "clsx";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div
      className={clsx(
        "mx-auto max-w-7xl px-6",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;