import { Outlet, useParams } from "react-router-dom";
import { useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { usePlayerSocket } from "../hooks/usePlayerSocket";
import { useGameEvents } from "../hooks/useGameEvents";

export default function PlayQuizPage() {
  const { roomCode } = useParams();

  const queryClient = useQueryClient();

  const [quizStarted] = useState(false);

  const refreshQuestion = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ["question", roomCode],
    });
  }, [queryClient, roomCode]);

  usePlayerSocket(roomCode!);
  useGameEvents({
  roomCode: roomCode!,
  refreshQuestion,
});

  if (!quizStarted) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-slate-50 px-6">
        <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-lg">

          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-5xl">
            🎮
          </div>

          <h1 className="text-4xl font-bold text-slate-900">
            You're In!
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Waiting for the host to start the quiz.
          </p>

          <div className="mt-10 rounded-2xl bg-slate-100 p-6">

            <p className="text-sm uppercase tracking-wider text-slate-500">
              Room Code
            </p>

            <h2 className="mt-2 text-5xl font-extrabold tracking-widest text-blue-600">
              {roomCode}
            </h2>

          </div>

          <div className="mt-10 flex items-center justify-center gap-3 text-slate-500">

            <div className="h-3 w-3 animate-pulse rounded-full bg-blue-500" />

            <span className="font-medium">
              Waiting for host...
            </span>

          </div>

          <p className="mt-6 text-sm text-slate-400">
            The quiz will begin automatically once the host starts it.
          </p>

        </div>
      </div>
    );
  }

  return <Outlet />;
}