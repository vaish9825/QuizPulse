import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/shared/components/ui/Button";
import { Card } from "@/shared/components/ui/Card";
import { Container } from "@/shared/components/layout/Container";

export default function ResultsPage() {
  const navigate = useNavigate();

  const leaderboard = useMemo(() => {
    const stored = sessionStorage.getItem(
      "finalLeaderboard"
    );

    return stored
      ? JSON.parse(stored)
      : [];
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-slate-50 to-white py-20">

      <Container>

        <div className="mx-auto max-w-4xl">

          <Card
            hover={false}
            className="p-12"
          >

            <div className="mb-6 flex justify-center">

              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-yellow-100 text-5xl shadow-md">
                🏆
              </div>

            </div>

            <h1 className="text-center text-5xl font-extrabold text-slate-900">
              Quiz Finished
            </h1>

            <p className="mt-3 text-center text-lg text-slate-500">
              Final Leaderboard
            </p>

            <div className="mt-12 space-y-4">

              {leaderboard.map(
                (
                  player: any,
                  index: number
                ) => (
                  <div
                    key={player.playerId}
                    className={`
                      flex items-center justify-between
                      rounded-2xl
                      border
                      px-6
                      py-5
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:shadow-lg

                      ${
                        index === 0
                          ? "border-yellow-300 bg-yellow-50"
                          : index === 1
                          ? "border-slate-300 bg-slate-100"
                          : index === 2
                          ? "border-orange-300 bg-orange-50"
                          : "border-slate-200 bg-slate-50"
                      }
                    `}
                  >
                    <div className="flex items-center gap-4">

                      <span className="text-3xl">

                        {index === 0
                          ? "🥇"
                          : index === 1
                          ? "🥈"
                          : index === 2
                          ? "🥉"
                          : "🎯"}

                      </span>

                      <span className="text-xl font-bold text-slate-900">
                        {player.nickname}
                      </span>

                    </div>

                    <span className="text-2xl font-bold text-indigo-600">
                      {player.score}
                    </span>

                  </div>
                )
              )}

            </div>

            <div className="mt-12 flex justify-center">

              <Button
                size="lg"
                onClick={() => navigate("/")}
              >
                Back to Dashboard
              </Button>

            </div>

          </Card>

        </div>

      </Container>

    </div>
  );
}