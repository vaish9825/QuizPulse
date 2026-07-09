interface Props {
  seconds: number;
  paused: boolean;
}

export function Timer({
  seconds,
  paused,
}: Props) {
  const danger = seconds <= 5;

  return (
    <div
      className={`
        rounded-full
        px-5
        py-2
        text-lg
        font-bold
        shadow-sm
        transition-all
        ${
          danger
            ? "bg-red-100 text-red-700"
            : "bg-indigo-100 text-indigo-700"
        }
      `}
    >
      {paused ? "⏸" : "⏳"} {seconds}s
    </div>
  );
}