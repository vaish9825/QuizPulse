import { useSearchParams } from "react-router-dom";

import { Container } from "@/shared/components/layout/Container";
import { PageHeader } from "@/shared/components/layout/PageHeader";

import JoinRoomForm from "../components/JoinRoomForm";

export default function JoinRoomPage() {
  const [searchParams] =
    useSearchParams();

  const roomCode =
    (
      searchParams.get("room") ?? ""
    ).toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-slate-50 to-white py-16">

      <Container>

        <div className="mx-auto max-w-2xl">

          <PageHeader
            title="Join Quiz"
            subtitle="Enter the room code shared by your host."
          />

          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-10 shadow-xl">

            <JoinRoomForm
              initialRoomCode={roomCode}
            />

          </div>

        </div>

      </Container>

    </div>
  );
}