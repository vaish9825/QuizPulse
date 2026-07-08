import { useParams } from "react-router-dom";

import { Container } from "@/shared/components/layout/Container";

export default function PlayerPage() {
  const { roomCode } = useParams();

  return (
    <Container>
      <div className="py-20 text-center">
        <h1 className="text-5xl font-bold text-white">
          Room {roomCode}
        </h1>

        <p className="mt-6 text-slate-400">
          Waiting for the host to start the quiz...
        </p>
      </div>
    </Container>
  );
}