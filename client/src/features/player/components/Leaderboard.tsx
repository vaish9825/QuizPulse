import type { LeaderboardPlayer } from "../types/leaderboard.types";

interface Props {
  players: LeaderboardPlayer[];
}

export default function Leaderboard({
  players,
}: Props) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-xl">

      <h2 className="mb-8 text-3xl font-bold text-slate-900">
        Leaderboard
      </h2>

      <div className="space-y-4">

        {players.map((player, index) => (

          <div
            key={player.playerId}
            className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5 transition hover:shadow-md"
          >

            <div className="flex items-center gap-4">

              <span className="text-xl font-bold text-indigo-600">
                #{index + 1}
              </span>

              <span className="text-xl font-semibold text-slate-900">
                {player.nickname}
              </span>

            </div>

            <span className="text-2xl font-bold text-emerald-600">
              {player.score}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}