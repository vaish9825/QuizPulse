import { Container } from "@/shared/components/layout/Container";
import { PageHeader } from "@/shared/components/layout/PageHeader";

import QuizForm from "../components/QuizForm";

export default function CreateQuizPage() {
  return (
    <div className="bg-slate-50">
      <Container>
        <div className="mx-auto max-w-5xl py-14">

          <PageHeader
            title="Create a New Quiz"
            subtitle="Design engaging quizzes for your audience in just a few minutes."
          />

          <div className="mt-10">
            <QuizForm />
          </div>

        </div>
      </Container>
    </div>
  );
}