import { useEffect, useState } from "react";

interface Props {
  seconds: number;
}

export function Timer({
  seconds,
}: Props) {
  const [timeLeft, setTimeLeft] =
    useState(seconds);

  useEffect(() => {
    setTimeLeft(seconds);
  }, [seconds]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const percentage =
    (timeLeft / seconds) * 100;

  return (
    <div className="mb-8">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-lg font-semibold text-white">
          Time Remaining
        </span>

        <span className="rounded-full bg-violet-600 px-5 py-2 text-2xl font-bold text-white">
          {timeLeft}s
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full bg-violet-500 transition-all duration-1000"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}