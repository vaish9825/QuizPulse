import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Container } from "@/shared/components/layout/Container";
import { PageHeader } from "@/shared/components/layout/PageHeader";
import { Card } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { useGeneratePdfQuiz } from "../hooks/useGeneratePdfQuiz";

import { useGenerateQuiz } from "../hooks/useGenerateQuiz";
import { useCreateRoom } from "@/features/room/hooks/useCreateRoom";

export default function AiQuizPage() {
  const navigate = useNavigate();

  const mutation = useGenerateQuiz();
  const pdfMutation =
  useGeneratePdfQuiz();

const [mode, setMode] = useState<
  "topic" | "pdf"
>("topic");

const [file, setFile] =
  useState<File | null>(null);

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

  async function handlePdfGenerate() {
  if (!file) return;

  try {
    const quiz = await pdfMutation.mutateAsync({
      file,
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
  setFile(null);

  setDifficulty("easy");
  setQuestions(10);

  setMode("topic");
}

  return (<div className="min-h-screen bg-gradient-to-b from-blue-50 via-slate-50 to-white py-16">

  <Container>

    <PageHeader
      title="AI Quiz Generator"
      subtitle="Generate quizzes from a topic or upload lecture notes as a PDF."
    />

    {!generatedQuiz ? (

      <Card
        hover={false}
        className="mx-auto mt-10 max-w-2xl p-10"
      >

        <div className="mb-8 flex rounded-xl bg-slate-100 p-1">

  <button
    className={`flex-1 rounded-lg py-3 font-semibold transition ${
      mode === "topic"
        ? "bg-white shadow"
        : ""
    }`}
    onClick={() =>
      setMode("topic")
    }
  >
    Topic
  </button>

  <button
    className={`flex-1 rounded-lg py-3 font-semibold transition ${
      mode === "pdf"
        ? "bg-white shadow"
        : ""
    }`}
    onClick={() =>
      setMode("pdf")
    }
  >
    PDF
  </button>

</div>

        {mode === "topic" && (

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
          e.target.value as any
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

)}
      {mode === "pdf" && (

<div className="space-y-6">

  <div>

  <label className="mb-3 block font-semibold">
    Upload PDF
  </label>

  <label
    htmlFor="pdf-upload"
    className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/40 px-8 py-12 transition hover:border-blue-400 hover:bg-blue-50"
  >

    <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow">

      <span className="text-5xl">
        📄
      </span>

    </div>

    <h3 className="text-2xl font-bold text-slate-900">
      Drag & Drop your PDF
    </h3>

    <p className="mt-2 text-slate-500">
      or click below to browse your files
    </p>

    <div className="mt-8 rounded-xl bg-white px-6 py-3 font-semibold text-blue-600 shadow-sm transition hover:shadow">

      Choose PDF File

    </div>

    <p className="mt-6 text-sm text-slate-400">
      Supports PDF files up to 20MB
    </p>

    {file && (
      <div className="mt-6 rounded-xl bg-green-100 px-5 py-3 font-medium text-green-700">
        ✅ {file.name}
      </div>
    )}

  </label>

  <input
    id="pdf-upload"
    hidden
    type="file"
    accept=".pdf"
    onChange={(e) =>
      setFile(
        e.target.files?.[0] ?? null
      )
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
          e.target.value as any
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
    disabled={pdfMutation.isPending}
    onClick={handlePdfGenerate}
  >
    {pdfMutation.isPending
      ? "Generating..."
      : "Generate Quiz from PDF"}
  </Button>

</div>

)}

      </Card>

    ) : (

      <Card
        hover={false}
        className="mx-auto mt-10 max-w-2xl p-10 text-center"
      >


        <h2 className="mt-8 text-3xl font-extrabold tracking-tight text-slate-800">

  Quiz Created Successfully

</h2>


        <div
  className="
    mt-10
    rounded-3xl
    border
    border-blue-100
    bg-white
    p-8
    shadow-xl
  "
>


  <h3 className="text-2xl font-bold text-slate-900">

    {generatedQuiz.title}

  </h3>

  <p className="mx-auto mt-4 max-w-xl text-s leading-8 text-slate-600">

    {generatedQuiz.description}

  </p>

  <div className="mt-8 flex flex-wrap justify-center gap-4">

  <div className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
    {generatedQuiz.difficulty}
  </div>

  <div className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
    {generatedQuiz.questions.length} Questions
  </div>

  <div className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
    AI Generated
  </div>

</div>

</div>

        <div className="mt-10 flex flex-wrap justify-center gap-5">

  <Button
    className="min-w-[150px] rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-white shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
    onClick={handleStartLive}
    disabled={createRoom.isPending}
  >
    {createRoom.isPending
      ? "Creating Room..."
      : "Start Live Quiz"}
  </Button>

  <Button
    className="min-w-[150px] rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-white shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
    onClick={handleMyQuizzes}
  >
    View My Quizzes
  </Button>

  <Button
    className="min-w-[150px] rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-white shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
    onClick={handleGenerateAnother}
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