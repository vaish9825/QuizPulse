import { useState } from "react";

interface Props {
  question: string;
  options: string[];
  onAnswer: (
    answer: number
  ) => void;
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
    <div>

      <h1 className="mb-10 text-center text-3xl font-bold text-slate-900">
        {question}
      </h1>

      <div className="mx-auto max-w-2xl space-y-4">

        {options.map(
          (option, index) => (
            <button
              key={index}
              disabled={
                selected !== null
              }
              onClick={() =>
                handleClick(index)
              }
              className={`
                w-full
                rounded-2xl
                border
                p-5
                text-left
                text-lg
                font-medium
                transition-all
                duration-200

                ${
                  selected === index
                    ? "border-indigo-600 bg-indigo-600 text-white shadow-lg"
                    : "border-slate-200 bg-white text-slate-800 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-md"
                }
              `}
            >
              {option}
            </button>
          )
        )}

      </div>

      {selected !== null && (
        <p className="mt-8 text-center text-indigo-600 font-semibold">
          ✅ Answer submitted. Waiting for next question...
        </p>
      )}

    </div>
  );
}