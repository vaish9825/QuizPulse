import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { Timer } from "@/shared/components/ui/Timer";

import QuestionCard from "../components/QuestionCard";
import Leaderboard from "../components/Leaderboard";

import { useCurrentQuestion } from "../hooks/useCurrentQuestion";
import { useLeaderboard } from "../hooks/useLeaderboard";
import { useGameEvents } from "../hooks/useGameEvents";
import { submitAnswer } from "../hooks/useSubmitAnswer";

export default function QuestionPage() {
  const { roomCode } = useParams();

  const queryClient = useQueryClient();

  const leaderboard = useLeaderboard();

  const refreshQuestion = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ["question", roomCode],
    });
  }, [queryClient, roomCode]);

  useGameEvents(roomCode!, refreshQuestion);

  const {
    data,
    isLoading,
  } = useCurrentQuestion(roomCode!);

  if (isLoading || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Loading question...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-8 py-10">
      <Timer seconds={data.remainingTime} />

      <QuestionCard
        question={data.question}
        options={data.options}
        onAnswer={(answer) =>
          submitAnswer(roomCode!, answer)
        }
      />

      {leaderboard && (
        <div className="mt-10">
          <Leaderboard
            players={leaderboard.leaderboard}
          />
        </div>
      )}
    </div>
  );
}