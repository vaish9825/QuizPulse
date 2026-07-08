interface Props {
  seconds: number;
}

export function Timer({
  seconds,
}: Props) {
  return (
    <div className="mb-8 text-center">
      <span className="rounded-full bg-violet-600 px-6 py-3 text-3xl font-bold text-white">
        {seconds}s
      </span>
    </div>
  );
}