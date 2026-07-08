interface Props {
  question: string;
  options: string[];
}

export default function QuestionCard({
  question,
  options,
}: Props) {
  return (
    <div className="mx-auto max-w-4xl rounded-2xl bg-slate-900 p-10">
      <h1 className="text-3xl font-bold text-white">
        {question}
      </h1>

      <div className="mt-10 grid grid-cols-2 gap-6">
        {options.map((option) => (
          <button
            key={option}
            className="rounded-xl bg-slate-800 p-6 text-left text-lg text-white transition hover:bg-violet-600"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}