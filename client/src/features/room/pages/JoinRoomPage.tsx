import { Container } from "@/shared/components/layout/Container";
import { PageHeader } from "@/shared/components/layout/PageHeader";

import JoinRoomForm from "../components/JoinRoomForm";

export default function JoinRoomPage() {
  return (
    <Container>
      <div className="py-10">
        <PageHeader
          title="Join Room"
          subtitle="Enter the room code shared by your teacher."
        />

        <JoinRoomForm />
      </div>
    </Container>
  );
}