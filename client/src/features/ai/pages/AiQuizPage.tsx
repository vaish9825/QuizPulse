import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Container } from "@/shared/components/layout/Container";
import { PageHeader } from "@/shared/components/layout/PageHeader";
import { Card } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { Badge } from "@/shared/components/ui/Badge";

import { useGenerateQuiz } from "../hooks/useGenerateQuiz";
import { useCreateRoom } from "@/features/room/hooks/useCreateRoom";

export default function AiQuizPage() {
  const navigate = useNavigate();

  const mutation = useGenerateQuiz();

  const createRoom = useCreateRoom();

  const [generatedQuiz, setGeneratedQuiz] =
    useState<any>(null);

  const [topic, setTopic] =
    useState("");

  const [difficulty, setDifficulty] =
    useState<
      "easy" | "medium" | "hard"
    >("easy");

  const [questions, setQuestions] =
    useState(10);

  async function handleGenerate() {
    if (!topic.trim()) return;

    try {
      const quiz =
        await mutation.mutateAsync({
          topic,
          difficulty,
          questions,
        });

      setGeneratedQuiz(quiz);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleStartLive() {
    if (!generatedQuiz) return;

    try {
      const response =
        await createRoom.mutateAsync(
          generatedQuiz._id
        );

      const roomCode =
        response.data.data.roomCode;

      navigate(`/host/${roomCode}`);
    } catch (err) {
      console.error(err);
    }
  }

  function handleMyQuizzes() {
    navigate("/");

    setTimeout(() => {
      document
        .getElementById("my-quizzes")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }, 150);
  }

  function handleGenerateAnother() {
    setGeneratedQuiz(null);
    setTopic("");
    setDifficulty("easy");
    setQuestions(10);
  }

  return (<div className="min-h-screen bg-slate-50 py-16">

  <Container>

    <PageHeader
      title="AI Quiz Generator"
      subtitle="Generate an entire quiz from any topic."
    />

    {!generatedQuiz ? (

      <Card
        hover={false}
        className="mx-auto mt-10 max-w-2xl p-10"
      >

        <div className="space-y-6">

          <div>

            <label className="mb-2 block font-semibold">
              Topic
            </label>

            <input
              className="w-full rounded-xl border p-3"
              placeholder="Operating Systems"
              value={topic}
              onChange={(e) =>
                setTopic(e.target.value)
              }
            />

          </div>

          <div>

            <label className="mb-2 block font-semibold">
              Difficulty
            </label>

            <select
              className="w-full rounded-xl border p-3"
              value={difficulty}
              onChange={(e) =>
                setDifficulty(
                  e.target.value as
                    | "easy"
                    | "medium"
                    | "hard"
                )
              }
            >

              <option>easy</option>
              <option>medium</option>
              <option>hard</option>

            </select>

          </div>

          <div>

            <label className="mb-2 block font-semibold">
              Questions
            </label>

            <input
              type="number"
              min={2}
              max={30}
              className="w-full rounded-xl border p-3"
              value={questions}
              onChange={(e) =>
                setQuestions(
                  Number(e.target.value)
                )
              }
            />

          </div>

          <Button
            className="w-full"
            disabled={mutation.isPending}
            onClick={handleGenerate}
          >
            {mutation.isPending
              ? "Generating..."
              : "Generate Quiz"}
          </Button>

        </div>

      </Card>

    ) : (

      <Card
        hover={false}
        className="mx-auto mt-10 max-w-2xl p-10 text-center"
      >

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">

          ✅

        </div>

        <h2 className="mt-6 text-3xl font-bold">

          Quiz Created Successfully

        </h2>

        <p className="mt-3 text-slate-600">

          Your AI quiz has been generated and saved.

        </p>

        <div className="mt-8 rounded-2xl border bg-slate-50 p-6">

          <h3 className="text-2xl font-bold">

            {generatedQuiz.title}

          </h3>

          <p className="mt-3 text-slate-600">

            {generatedQuiz.description}

          </p>

          <div className="mt-5 flex justify-center gap-3">

            <Badge>

              {generatedQuiz.difficulty}

            </Badge>

            <Badge>

              {generatedQuiz.questions.length}
              {" "}Questions

            </Badge>

          </div>

        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">

          <Button
            onClick={handleStartLive}
            disabled={
              createRoom.isPending
            }
          >
            {createRoom.isPending
              ? "Creating Room..."
              : "Start Live"}
          </Button>

          <Button
            variant="outline"
            onClick={handleMyQuizzes}
          >
            Go to My Quizzes
          </Button>

          <Button
            variant="secondary"
            onClick={
              handleGenerateAnother
            }
          >
            Generate Another
          </Button>

        </div>

      </Card>

    )}

  </Container>

</div>
  );
}