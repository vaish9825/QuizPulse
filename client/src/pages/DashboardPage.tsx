import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";

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

  const [showCreateMenu, setShowCreateMenu] =
  useState(false);

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
              🚀 Real-Time Multiplayer Quiz Platform
            </span>

            <h1 className="mt-8 max-w-4xl text-6xl font-extrabold leading-tight text-slate-900">
              Live Quizzes
              <br />

              <span className="text-blue-600">
                Made Easy.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-xl leading-8 text-slate-600">
              Create quizzes manually or with AI, host live sessions,
track real-time leaderboards and let participants join instantly.
            </p>

<div className="mt-10 flex flex-wrap justify-center gap-5">

  <Button
    size="lg"
    className="min-w-[170px] rounded-full"
    onClick={() => navigate("/create")}
  >
    Create Quiz
  </Button>

  <Button
    size="lg"
    className="min-w-[170px] rounded-full"
    onClick={() => navigate("/ai")}
  >
    AI Quiz
  </Button>

  <Button
    size="lg"
    className="min-w-[170px] rounded-full"
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

        <section  id="my-quizzes" className="pt-6 pb-16">

          <div className="mb-8 flex items-center justify-between">

            <h2 className="text-4xl font-bold text-slate-900">
              My Quizzes
            </h2>

            <div className="relative">

  <Button
    onClick={() =>
      setShowCreateMenu(!showCreateMenu)
    }
    className="flex items-center gap-2"
  >
    + New Quiz

    <ChevronDown size={16} />

  </Button>

  {showCreateMenu && (

    <div className="absolute right-0 mt-2 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">

      <button
        className="block w-full px-5 py-4 text-left transition hover:bg-slate-50"
        onClick={() => {
          setShowCreateMenu(false);
          navigate("/create");
        }}
      >

        <p className="font-semibold">
          Manual Quiz
        </p>

        <p className="text-sm text-slate-500">
          Create your own questions
        </p>

      </button>

      <button
        className="block w-full border-t px-5 py-4 text-left transition hover:bg-slate-50"
        onClick={() => {
          setShowCreateMenu(false);
          navigate("/ai");
        }}
      >

        <p className="font-semibold">
          AI Quiz
        </p>

        <p className="text-sm text-slate-500">
          Generate with Gemini AI
        </p>

      </button>

    </div>

  )}

</div>

          </div>

          {data && data.length > 0 ? (
            <QuizList quizzes={data} />
          ) : (
            <Card
  hover={false}
  className="p-12"
>

  <div className="text-center">

    <h3 className="text-3xl font-bold text-slate-900">
      No quizzes yet
    </h3>

    <p className="mt-3 text-lg text-slate-500">
      Choose how you'd like to create your first quiz.
    </p>

  </div>

  <div className="mt-12 grid gap-8 md:grid-cols-2">

    {/* Manual Quiz */}

    <Card className="p-8">

      <div className="text-5xl">
        📝
      </div>

      <h4 className="mt-6 text-2xl font-bold">
        Manual Quiz
      </h4>

      <p className="mt-4 leading-7 text-slate-600">
        Build your quiz question by question with complete control.
      </p>

      <Button
        className="mt-8 w-full"
        onClick={() =>
          navigate("/create")
        }
      >
        Create Quiz
      </Button>

    </Card>

    {/* AI Quiz */}

    <Card className="border-blue-200 bg-blue-50 p-8">

      <div className="text-5xl">
        🤖
      </div>

      <h4 className="mt-6 text-2xl font-bold">
        AI Quiz
      </h4>

      <p className="mt-4 leading-7 text-slate-600">
        Generate an entire quiz from any topic in seconds using Gemini AI.
      </p>

      <Button
        className="mt-8 w-full"
        onClick={() =>
          navigate("/ai")
        }
      >
        Generate AI Quiz
      </Button>

    </Card>

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