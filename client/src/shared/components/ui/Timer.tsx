import { useEffect, useState } from "react";

interface Props {
  seconds: number;
}

export function Timer({
  seconds,
}: Props) {
  const [time, setTime] =
    useState(seconds);

  useEffect(() => {
    setTime(seconds);

    const interval = setInterval(() => {
      setTime((prev) =>
        prev > 0 ? prev - 1 : 0
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  const danger = time <= 5;

  return (
    <div
      className={`rounded-full px-5 py-2 text-lg font-bold shadow-sm

${
  danger
    ? "bg-red-100 text-red-700"
    : "bg-indigo-100 text-indigo-700"
}`}
    >
      ⏳ {time}s
    </div>
  );
}