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
      const response = await createRoom.mutateAsync(id);

      const roomCode = response.data.data.roomCode;

      navigate(`/host/${roomCode}`);
    } catch (error) {
      console.error(error);
    }
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