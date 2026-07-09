import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import {
  useHostSocket,
  startQuiz,
} from "../hooks/useHostSocket";
import { useRoom } from "../hooks/useRoom";

import { Container } from "@/shared/components/layout/Container";
import { PageHeader } from "@/shared/components/layout/PageHeader";
import { Button } from "@/shared/components/ui/Button";

export default function HostRoomPage() {
  const { roomCode } = useParams();

  const queryClient = useQueryClient();

  const refreshRoom = useCallback(() => {
    if (!roomCode) return;

    queryClient.invalidateQueries({
      queryKey: ["room", roomCode],
    });
  }, [queryClient, roomCode]);

  useHostSocket(roomCode!, refreshRoom);

  const { data: room, isLoading } = useRoom(roomCode!);

  if (isLoading) {
    return (
      <Container>
        <div className="py-20 text-center text-slate-600">
          Loading room...
        </div>
      </Container>
    );
  }

  if (!room) {
    return (
      <Container>
        <div className="py-20 text-center text-red-500">
          Room not found.
        </div>
      </Container>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-slate-50 to-white">

      <Container>

        <div className="py-12">

          <PageHeader
            title="Live Room"
            subtitle="Share the room code with your participants."
          />

          <div className="mx-auto mt-10 max-w-5xl rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">

            {/* Room Code */}

            <div className="text-center">

              <p className="text-lg text-slate-500">
                Room Code
              </p>

              <h1 className="mt-3 text-6xl font-black tracking-[0.25em] text-indigo-600">
                {room.roomCode}
              </h1>

            </div>

            {/* Quiz Information */}

            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">

              <h2 className="text-3xl font-bold text-slate-900">
                {room.quizId.title}
              </h2>

              <p className="mt-2 text-lg text-slate-600">
                {room.quizId.description}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">

                <div>
                  <p className="text-sm text-slate-500">
                    Questions
                  </p>

                  <p className="mt-1 text-2xl font-bold text-slate-900">
                    {room.quizId.questions.length}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Players
                  </p>

                  <p className="mt-1 text-2xl font-bold text-slate-900">
                    {room.players.length}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Status
                  </p>

                  <p className="mt-1 text-2xl font-bold capitalize text-indigo-600">
                    {room.status}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Question
                  </p>

                  <p className="mt-1 text-2xl font-bold text-slate-900">
                    {room.currentQuestionIndex + 1} / {room.quizId.questions.length}
                  </p>
                </div>

              </div>

            </div>

            {/* Participants */}

            <div className="mt-8">

              <h3 className="mb-5 text-2xl font-bold text-slate-900">
                Participants ({room.players.length})
              </h3>

              {room.players.length === 0 ? (

                <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 py-10 text-center text-slate-500">
                  Waiting for participants to join...
                </div>

              ) : (

                <div className="space-y-3">

                  {room.players.map((player) => (

                    <div
                      key={player.playerId}
                      className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 transition hover:border-indigo-300 hover:shadow-md"
                    >

                      <div>

                        <p className="text-lg font-semibold text-slate-900">
                          {player.nickname}
                        </p>

                        <p className="text-sm text-green-600">
                          ● Connected
                        </p>

                      </div>

                      <div className="text-right">

                        <p className="text-sm text-slate-500">
                          Score
                        </p>

                        <p className="text-xl font-bold text-indigo-600">
                          {player.score}
                        </p>

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>

            {/* Start Quiz */}

            <div className="mt-8 flex justify-center">

              <Button
                size="lg"
                className="rounded-xl px-10"
                onClick={() => {
                  console.log("BUTTON CLICKED");
                  startQuiz(room.roomCode);
                }}
              >
                🚀 Start Quiz
              </Button>

            </div>

          </div>

        </div>

      </Container>

    </div>
  );
}