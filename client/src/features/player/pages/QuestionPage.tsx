import { useParams } from "react-router-dom";

import { Timer } from "@/shared/components/ui/Timer";

import QuestionCard from "../components/QuestionCard";

import { useCurrentQuestion } from "../hooks/useCurrentQuestion";

export default function QuestionPage() {
  const { roomCode } = useParams();

  const {
    data: question,
    isLoading,
    isError,
  } = useCurrentQuestion(roomCode!);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Loading question...
      </div>
    );
  }

  if (isError || !question) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-red-400">
        Unable to load question.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-8 py-10">
      <Timer seconds={question.duration} />

      <QuestionCard
        question={question.question}
        options={question.options}
      />
    </div>
  );
}