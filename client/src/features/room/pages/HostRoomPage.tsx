import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import QRCode from "react-qr-code";

import {
  useHostSocket,
  startQuiz,
  pauseQuiz,
  resumeQuiz,
  endQuiz,
} from "../hooks/useHostSocket";

import { useRoom } from "../hooks/useRoom";

import { Container } from "@/shared/components/layout/Container";
import { PageHeader } from "@/shared/components/layout/PageHeader";
import { Button } from "@/shared/components/ui/Button";
import { Card } from "@/shared/components/ui/Card";

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

  const { data: room, isLoading } =
    useRoom(roomCode!);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        Loading room...
      </div>
    );
  }

  if (!room) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-red-500">
        Room not found.
      </div>
    );
  }

  const joinUrl = `${window.location.origin}/join?room=${room.roomCode}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-slate-50 to-white py-16">

      <Container>

        <div className="mx-auto max-w-5xl">

          <PageHeader
            title="Live Room"
            subtitle="Share the room code or QR code with participants."
          />

          <Card
            hover={false}
            className="mt-8 p-8"
          >

            <div className="grid gap-10 lg:grid-cols-2">

              {/* LEFT */}

              <div>

                <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                  Room Code
                </p>

                <h1 className="mt-3 text-6xl font-extrabold tracking-widest text-blue-600">
                  {room.roomCode}
                </h1>

                <div className="mt-8 rounded-2xl bg-slate-50 p-6">

                  <h2 className="text-2xl font-bold text-slate-900">
                    {room.quizId.title}
                  </h2>

                  <p className="mt-2 text-slate-600">
                    {room.quizId.description}
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-5">

                    <div>
                      <p className="text-sm text-slate-500">
                        Questions
                      </p>

                      <p className="text-xl font-semibold">
                        {room.quizId.questions.length}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        Players
                      </p>

                      <p className="text-xl font-semibold">
                        {room.players.length}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        Status
                      </p>

                      <p className="text-xl font-semibold capitalize">
                        {room.status}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        Question
                      </p>

                      <p className="text-xl font-semibold">
                        {room.currentQuestionIndex + 1} /{" "}
                        {room.quizId.questions.length}
                      </p>
                    </div>

                  </div>

                </div>

                {/* Controls */}

                <div className="mt-8 flex flex-wrap justify-center gap-4">

                  {room.status === "waiting" && (
                    <Button
                      onClick={() =>
                        startQuiz(room.roomCode)
                      }
                    >
                      🚀 Start Quiz
                    </Button>
                  )}

                  {room.status === "live" && (
                    <>
                      <Button
                        variant="secondary"
                        onClick={() =>
                          pauseQuiz(room.roomCode)
                        }
                      >
                        ⏸ Pause
                      </Button>

                      <Button
                        variant="danger"
                        onClick={() =>
                          endQuiz(room.roomCode)
                        }
                      >
                        🛑 End Quiz
                      </Button>
                    </>
                  )}

                  {room.status === "paused" && (
                    <>
                      <Button
                        onClick={() =>
                          resumeQuiz(room.roomCode)
                        }
                      >
                        ▶ Resume
                      </Button>

                      <Button
                        variant="danger"
                        onClick={() =>
                          endQuiz(room.roomCode)
                        }
                      >
                        🛑 End Quiz
                      </Button>
                    </>
                  )}

                </div>

              </div>

              {/* RIGHT */}

              <div className="flex flex-col items-center justify-center rounded-2xl bg-slate-50 p-8">

                <QRCode
                  value={joinUrl}
                  size={220}
                />

                <p className="mt-6 text-center text-lg font-semibold text-slate-800">
                  Scan to Join
                </p>

                <p className="mt-2 break-all text-center text-sm text-slate-500">
                  {joinUrl}
                </p>

              </div>

            </div>

            {/* Participants */}

            <div className="mt-12">

              <h2 className="mb-5 text-2xl font-bold text-slate-900">
                Participants ({room.players.length})
              </h2>

              {room.players.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 py-10 text-center text-slate-500">
                  Waiting for participants...
                </div>
              ) : (
                <div className="space-y-3">

                  {room.players.map((player) => (
                    <div
                      key={player.playerId}
                      className="flex items-center justify-between rounded-xl bg-slate-50 px-6 py-4"
                    >
                      <div>
                        <p className="font-semibold text-slate-900">
                          {player.nickname}
                        </p>

                        <p className="text-sm text-slate-500">
                          Connected
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-slate-500">
                          Score
                        </p>

                        <p className="font-bold text-slate-900">
                          {player.score}
                        </p>
                      </div>
                    </div>
                  ))}

                </div>
              )}

            </div>

          </Card>

        </div>

      </Container>

    </div>
  );
}