import { useParams } from "react-router-dom";

import { Card } from "@/shared/components/ui/Card";
import { Container } from "@/shared/components/layout/Container";

import Leaderboard from "../components/Leaderboard";
import { useLeaderboard } from "../hooks/useLeaderboard";
import { useGameEvents } from "../hooks/useGameEvents";

export default function LeaderboardPage() {
  const { roomCode } = useParams();

  useGameEvents({
    roomCode: roomCode!,
  });

  const leaderboard =
    useLeaderboard();

  if (!leaderboard) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-lg font-medium text-slate-600">
        Loading leaderboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-slate-50 to-white py-16">

      <Container>

        <div className="mx-auto max-w-5xl">

          <h1 className="mb-12 text-center text-6xl font-extrabold text-slate-900">
            🏆 Leaderboard
          </h1>

          <Card
            hover={false}
            className="p-10"
          >

            <Leaderboard
              players={
                leaderboard.leaderboard
              }
            />

          </Card>

        </div>

      </Container>

    </div>
  );
}