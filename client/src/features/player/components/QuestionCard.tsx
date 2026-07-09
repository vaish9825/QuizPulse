import { useState } from "react";

interface Props {
  question: string;
  options: string[];
  correctAnswer: number | null;
  onAnswer: (
    answer: number
  ) => void;
}

export default function QuestionCard({
  question,
  options,
  correctAnswer,
  onAnswer,
}: Props) {
  const [selected, setSelected] =
    useState<number | null>(null);

  function handleClick(index: number) {
    if (
      selected !== null ||
      correctAnswer !== null
    )
      return;

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
          (option, index) => {

            let style =
              "border-slate-200 bg-white text-slate-800 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-md";

            if (
              correctAnswer === null &&
              selected === index
            ) {
              style =
                "border-indigo-600 bg-indigo-600 text-white";
            }

            if (
              correctAnswer !== null &&
              index === correctAnswer
            ) {
              style =
                "border-green-600 bg-green-500 text-white";
            }

            if (
              correctAnswer !== null &&
              selected === index &&
              selected !== correctAnswer
            ) {
              style =
                "border-red-600 bg-red-500 text-white";
            }

            return (
              <button
                key={index}
                disabled={
                  correctAnswer !== null
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
                  duration-300
                  ${style}
                `}
              >
                {option}
              </button>
            );
          }
        )}

      </div>

      {correctAnswer === null &&
        selected !== null && (
          <p className="mt-8 text-center font-semibold text-indigo-600">
            ✅ Answer submitted. Waiting for timer...
          </p>
        )}

      {correctAnswer !== null && (
        <p className="mt-8 text-center font-semibold text-slate-700">
          ✅ Correct answer revealed
        </p>
      )}

    </div>
  );
}