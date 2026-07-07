import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { Card } from "@/shared/components/ui/Card";

import { useDeleteQuiz } from "../hooks/useDeleteQuiz";

interface Props {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  questionCount: number;
}

export default function QuizCard({
  id,
  title,
  description,
  difficulty,
  questionCount,
}: Props) {
  const deleteQuiz = useDeleteQuiz();

  async function handleDelete() {
    const confirmed = window.confirm(
      `Delete "${title}"?`
    );

    if (!confirmed) return;

    await deleteQuiz.mutateAsync(id);
  }

  return (
    <Card>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">
          {title}
        </h2>

        <p className="text-slate-400">
          {description}
        </p>

        <div className="flex gap-3">
          <Badge>{difficulty}</Badge>

          <Badge>{questionCount} Questions</Badge>
        </div>

        <div className="flex gap-3">
          <Button>
            Start Live
          </Button>

          <Button
            variant="danger"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
}