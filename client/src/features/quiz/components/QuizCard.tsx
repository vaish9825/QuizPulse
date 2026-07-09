import { useNavigate } from "react-router-dom";

import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { Card } from "@/shared/components/ui/Card";

import { useDeleteQuiz } from "../hooks/useDeleteQuiz";
import { useCreateRoom } from "@/features/room/hooks/useCreateRoom";

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
  const navigate = useNavigate();

  const deleteQuiz = useDeleteQuiz();
  const createRoom = useCreateRoom();

  async function handleDelete() {
    const confirmed = window.confirm(
      `Delete "${title}"?`
    );

    if (!confirmed) return;

    await deleteQuiz.mutateAsync(id);
  }

  async function handleStartLive() {
    try {
      const response =
        await createRoom.mutateAsync(id);

      const roomCode =
        response.data.data.roomCode;

      navigate(`/host/${roomCode}`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex h-full flex-col justify-between">

        {/* Header */}

        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            {title}
          </h2>

          <p className="mt-3 line-clamp-2 text-slate-600 leading-relaxed">
            {description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <Badge>{difficulty}</Badge>

            <Badge>
              {questionCount} Questions
            </Badge>
          </div>
        </div>

        {/* Footer */}

        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            onClick={handleStartLive}
            disabled={createRoom.isPending}
          >
            {createRoom.isPending
              ? "Creating..."
              : "Start Live"}
          </Button>

          <Button
            variant="danger"
            onClick={handleDelete}
            disabled={deleteQuiz.isPending}
          >
            Delete
          </Button>
        </div>

      </div>
    </Card>
  );
}