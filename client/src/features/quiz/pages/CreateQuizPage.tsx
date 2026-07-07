import { Container } from "@/shared/components/layout/Container";
import { PageHeader } from "@/shared/components/layout/PageHeader";

import QuizForm from "../components/QuizForm.tsx";

export default function CreateQuizPage() {
  return (
    <Container>
      <div className="py-10">
        <PageHeader
          title="Create Quiz"
          subtitle="Create a new live quiz."
        />

        <QuizForm />
      </div>
    </Container>
  );
}