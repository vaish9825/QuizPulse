import { Container } from "@/shared/components/layout/Container";
import { PageHeader } from "@/shared/components/layout/PageHeader";

import JoinRoomForm from "../components/JoinRoomForm";

export default function JoinRoomPage() {
  return (
    <div className="bg-slate-50">
      <Container>
        <div className="mx-auto max-w-5xl py-14">

          <PageHeader
            title="Join a Live Quiz"
            subtitle="Enter the room code shared by your host and start competing in seconds."
          />

          <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">

            <div className="grid items-center gap-12 md:grid-cols-2">

              {/* Left */}

              <div>

                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-3xl">
                  🎮
                </div>

                <h2 className="text-3xl font-bold text-slate-900">
                  Ready to Play?
                </h2>

                <p className="mt-5 text-lg leading-8 text-slate-600">
                  Join any live quiz instantly using your
                  room code. No complicated setup—just
                  enter your nickname and you're in.
                </p>

              </div>

              {/* Right */}

              <JoinRoomForm />

            </div>

          </div>

        </div>
      </Container>
    </div>
  );
}