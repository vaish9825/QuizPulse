import { useState } from "react";
import { useParams } from "react-router-dom";

import { Timer } from "@/shared/components/ui/Timer";
import { Card } from "@/shared/components/ui/Card";

import QuestionCard from "../components/QuestionCard";

import { useCurrentQuestion } from "../hooks/useCurrentQuestion";
import { submitAnswer } from "../hooks/useSubmitAnswer";
import { useGameEvents } from "../hooks/useGameEvents";

export default function QuestionPage() {
  const { roomCode } = useParams();

  const {
    data,
    isLoading,
    refetch,
  } = useCurrentQuestion(roomCode!);

  const [correctAnswer, setCorrectAnswer] =
    useState<number | null>(null);

  useGameEvents({
    roomCode: roomCode!,
    refreshQuestion: () => {
      sessionStorage.removeItem(
        "leaderboard"
      );

      setCorrectAnswer(null);

      refetch();
    },
    revealAnswer: (answer) => {
      setCorrectAnswer(answer);
    },
  });

  if (isLoading || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        Loading...
      </div>
    );
  }

  const progress =
    ((data.index + 1) /
      data.totalQuestions) *
    100;

  return (
    <div className="min-h-screen bg-slate-50 py-12">

      <div className="mx-auto max-w-4xl px-6">

        <div className="mb-8">

          <div className="mb-3 flex items-center justify-between">

            <span className="text-lg font-semibold text-slate-800">
              Question {data.index + 1} /{" "}
              {data.totalQuestions}
            </span>

            <Timer
              seconds={data.remainingTime}
            />

          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-200">

            <div
              className="h-full rounded-full bg-indigo-600 transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

        <Card hover={false}>

          <QuestionCard
            key={data.index}
            question={data.question}
            options={data.options}
            correctAnswer={correctAnswer}
            onAnswer={(answer) =>
              submitAnswer(
                roomCode!,
                answer
              )
            }
          />

        </Card>

      </div>

    </div>
  );
}