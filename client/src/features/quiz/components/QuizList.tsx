import QuizCard from "./QuizCard";
import type { Quiz } from "@/types/quiz";

interface Props {
  quizzes: Quiz[];
}

export default function QuizList({
  quizzes,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
      {quizzes.map((quiz) => (
        <QuizCard
          key={quiz._id}
          id={quiz._id}
          title={quiz.title}
          description={quiz.description}
          difficulty={quiz.difficulty}
          questionCount={quiz.questions.length}
        />
      ))}
    </div>
  );
}