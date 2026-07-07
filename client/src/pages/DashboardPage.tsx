import { useNavigate } from "react-router-dom";

import { Button } from "@/shared/components/ui/Button";
import { Container } from "@/shared/components/layout/Container";
import { PageHeader } from "@/shared/components/layout/PageHeader";
import { Spinner } from "@/shared/components/ui/Spinner";

import QuizList from "@/features/quiz/components/QuizList";

import { useQuizzes } from "@/hooks/useQuizzes";

export default function DashboardPage() {
  const navigate = useNavigate();

  const { data, isLoading } = useQuizzes();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <Spinner />
      </div>
    );
  }

  return (
    <Container>
      <div className="py-10">
        <PageHeader
          title="Dashboard"
          subtitle="Manage your quizzes and start live sessions."
          action={
            <Button onClick={() => navigate("/create")}>
              + Create Quiz
            </Button>
          }
        />

        {data && data.length > 0 ? (
          <QuizList quizzes={data} />
        ) : (
          <div className="mt-8 rounded-xl border border-dashed border-slate-700 bg-slate-900 p-10 text-center">
            <h2 className="text-2xl font-semibold text-white">
              No quizzes yet
            </h2>

            <p className="mt-2 text-slate-400">
              Create your first quiz to start hosting live sessions.
            </p>

            <div className="mt-6">
              <Button onClick={() => navigate("/create")}>
                + Create Your First Quiz
              </Button>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}