import { useNavigate } from "react-router-dom";

import { Button } from "@/shared/components/ui/Button";
import { Card } from "@/shared/components/ui/Card";
import { Container } from "@/shared/components/layout/Container";
import FAQ from "@/shared/components/layout/FAQ";
import QuizList from "@/features/quiz/components/QuizList";
import JoinRoomForm from "@/features/room/components/JoinRoomForm";

import { useQuizzes } from "@/hooks/useQuizzes";
import { Spinner } from "@/shared/components/ui/Spinner";

export default function DashboardPage() {
  const navigate = useNavigate();

  const { data, isLoading } = useQuizzes();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="bg-slate-50">

      {/* HERO */}

      <section className="bg-gradient-to-b from-blue-50 via-slate-50 to-white">

        <Container>

          <div className="flex min-h-[82vh] flex-col items-center justify-center text-center">

            <span className="rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-600">
              🚀 Real-Time Quiz Platform
            </span>

            <h1 className="mt-8 max-w-4xl text-6xl font-extrabold leading-tight text-slate-900">
              Live Quizzes
              <br />

              <span className="text-blue-600">
                Made Easy.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-xl leading-8 text-slate-600">
              Create engaging quizzes, host live sessions,
              track leaderboards in real time and let
              participants join instantly.
            </p>

            <div className="mt-10 flex gap-5">

              <Button
                size="lg"
                className="rounded-full px-8"
                onClick={() => navigate("/create")}
              >
                Create Quiz
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  document
                    .getElementById("join")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });
                }}
              >
                Join Quiz
              </Button>

            </div>

          </div>

        </Container>

      </section>

      {/* FEATURES */}

<Container>
  <section className="py-8">

    <div className="mb-10 text-center">

      <h2 className="text-5xl font-bold text-slate-900">
        Why QuizPulse?
      </h2>

      <p className="mt-5 text-lg text-slate-600">
        Everything you need to run engaging live quizzes.
      </p>

    </div>

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {[
  {
    icon: "⚡",
    title: "Real-time Gameplay",
    desc: "Instant updates powered by Socket.IO with zero refreshes.",
  },
  {
    icon: "🏆",
    title: "Live Leaderboards",
    desc: "Watch rankings change after every question.",
  },
  {
    icon: "🤖",
    title: "AI Quiz Generator",
    desc: "Generate quizzes from any topic in seconds.",
  },
  {
    icon: "📱",
    title: "QR Room Join",
    desc: "Students scan and join instantly without typing room codes.",
  },
].map((feature) => (
  <Card
    key={feature.title}
    className="h-72 p-8"
  >
    <div className="flex h-full flex-col">

      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-3xl">
        {feature.icon}
      </div>

      <h3 className="text-2xl font-bold text-slate-900">
        {feature.title}
      </h3>

      <p className="mt-4 leading-7 text-slate-600">
        {feature.desc}
      </p>

    </div>
  </Card>
))}

    </div>

  </section>
</Container>

        {/* JOIN */}

<Container>

<section
id="join"
className="py-16"
>

<Card
  hover={false}
  className="mx-auto max-w-4xl p-10"
>
  <div className="grid gap-10 md:grid-cols-[1fr_1.1fr]">

    {/* Left */}

    <div className="flex flex-col justify-center">

      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-3xl">
        🎮
      </div>

      <h2 className="text-4xl font-bold text-slate-900">
        Ready to Play?
      </h2>

      <p className="mt-4 text-lg leading-8 text-slate-600">
        Enter your room code and nickname to join the quiz instantly.
      </p>

    </div>

    {/* Right */}

    <div className="self-center">
      <JoinRoomForm />
    </div>

  </div>
</Card>

</section>

</Container>



      {/* QUIZZES */}

      <Container>

        <section className="pt-6 pb-16">

          <div className="mb-8 flex items-center justify-between">

            <h2 className="text-4xl font-bold text-slate-900">
              Your Quizzes
            </h2>

            <Button
              onClick={() => navigate("/create")}
            >
              + New Quiz
            </Button>

          </div>

          {data && data.length > 0 ? (
            <QuizList quizzes={data} />
          ) : (
            <Card hover={false}>
              <div className="py-16 text-center">

                <h3 className="text-2xl font-bold text-slate-900">
                  No quizzes yet
                </h3>

                <p className="mt-3 text-slate-500">
                  Create your first quiz to begin.
                </p>

                <div className="mt-8">

                  <Button
                    onClick={() =>
                      navigate("/create")
                    }
                  >
                    Create Quiz
                  </Button>

                </div>

              </div>
            </Card>
          )}

        </section>

      </Container>
   <Container>
  <FAQ />
</Container>

    </div>
  );
}