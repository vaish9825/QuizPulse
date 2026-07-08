interface Player {
  playerId: string;
  nickname: string;
  score: number;
}

interface Props {
  players: Player[];
}

export default function Leaderboard({
  players,
}: Props) {
  return (
    <div className="rounded-xl bg-slate-900 p-6">
      <h2 className="mb-5 text-2xl font-bold text-white">
        Leaderboard
      </h2>

      <div className="space-y-3">
        {players.map((player, index) => (
          <div
            key={player.playerId}
            className="flex items-center justify-between rounded-lg bg-slate-800 px-5 py-4"
          >
            <div className="flex gap-4">
              <span className="font-bold text-indigo-400">
                #{index + 1}
              </span>

              <span className="text-white">
                {player.nickname}
              </span>
            </div>

            <span className="font-bold text-green-400">
              {player.score}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}