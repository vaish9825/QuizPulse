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
        <div className="py-10 text-center text-white">
          Loading room...
        </div>
      </Container>
    );
  }

  if (!room) {
    return (
      <Container>
        <div className="py-10 text-center text-red-400">
          Room not found.
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="py-10">
        <PageHeader
          title="Live Room"
          subtitle="Share the room code with your students."
        />

        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
          {/* Room Code */}

          <div className="text-center">
            <p className="text-slate-400">
              Room Code
            </p>

            <h1 className="mt-4 text-6xl font-bold tracking-widest text-white">
              {room.roomCode}
            </h1>
          </div>

          {/* Quiz Information */}

          <div className="mt-10 rounded-xl border border-slate-700 bg-slate-800 p-6">
            <h2 className="text-2xl font-bold text-white">
              {room.quizId.title}
            </h2>

            <p className="mt-2 text-slate-400">
              {room.quizId.description}
            </p>

            <div className="mt-5 grid grid-cols-2 gap-4 text-sm text-slate-300 md:grid-cols-4">
              <div>
                <p className="text-slate-500">
                  Questions
                </p>

                <p className="font-semibold">
                  {room.quizId.questions.length}
                </p>
              </div>

              <div>
                <p className="text-slate-500">
                  Players
                </p>

                <p className="font-semibold">
                  {room.players.length}
                </p>
              </div>

              <div>
                <p className="text-slate-500">
                  Status
                </p>

                <p className="font-semibold capitalize">
                  {room.status}
                </p>
              </div>

              <div>
                <p className="text-slate-500">
                  Question
                </p>

                <p className="font-semibold">
                  {room.currentQuestionIndex + 1} /{" "}
                  {room.quizId.questions.length}
                </p>
              </div>
            </div>
          </div>

          {/* Participants */}

          <div className="mt-10">
            <h3 className="mb-5 text-xl font-semibold text-white">
              Participants ({room.players.length})
            </h3>

            {room.players.length === 0 ? (
              <div className="rounded-lg border border-dashed border-slate-700 p-8 text-center text-slate-400">
                Waiting for students to join...
              </div>
            ) : (
              <div className="space-y-3">
                {room.players.map((player) => (
                  <div
                    key={player.playerId}
                    className="flex items-center justify-between rounded-lg bg-slate-800 px-5 py-4"
                  >
                    <div>
                      <p className="font-medium text-white">
                        {player.nickname}
                      </p>

                      <p className="text-xs text-slate-400">
                        Connected
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-slate-400">
                        Score
                      </p>

                      <p className="font-semibold text-white">
                        {player.score}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Start Quiz */}

          <div className="mt-12 flex justify-center">
            <Button
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
  );
}