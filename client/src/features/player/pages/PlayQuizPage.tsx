import { useParams } from "react-router-dom";

import { usePlayerSocket } from "../hooks/usePlayerSocket";

export default function PlayQuizPage() {
  console.log("PlayQuizPage rendered");
  const { roomCode } = useParams();

  usePlayerSocket(roomCode!);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold">
          Waiting for Host...
        </h1>

        <p className="mt-4 text-slate-400">
          The quiz will begin automatically.
        </p>
      </div>
    </div>
  );
}