import { useParams } from "react-router-dom";

export default function PlayQuizPage() {
  const { roomCode } = useParams();

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
      Waiting for quiz to start...

      <div className="mt-4">
        Room: {roomCode}
      </div>
    </div>
  );
}