import { useState } from "react";

interface Props {
  question: string;
  options: string[];
  onAnswer: (answer: number) => void;
}

export default function QuestionCard({
  question,
  options,
  onAnswer,
}: Props) {
  const [selected, setSelected] =
    useState<number | null>(null);

  function handleClick(index: number) {
    if (selected !== null) return;

    setSelected(index);

    onAnswer(index);
  }

  return (
    <div className="mt-10 rounded-2xl bg-slate-900 p-8">
      <h1 className="mb-8 text-3xl font-bold text-white">
        {question}
      </h1>

      <div className="space-y-4">
        {options.map((option, index) => (
          <button
            key={index}
            disabled={selected !== null}
            onClick={() =>
              handleClick(index)
            }
            className={`w-full rounded-xl p-5 text-left text-lg transition

${
  selected === index
    ? "bg-indigo-600 text-white"
    : "bg-slate-800 text-white hover:bg-slate-700"
}

${
  selected !== null
    ? "cursor-not-allowed"
    : ""
}`}
          >
            {option}
          </button>
        ))}
      </div>

      {selected !== null && (
        <p className="mt-6 text-center text-indigo-300">
          Answer submitted.
          Waiting for next question...
        </p>
      )}
    </div>
  );
}