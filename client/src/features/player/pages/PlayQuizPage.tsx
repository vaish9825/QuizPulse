import { Outlet, useParams } from "react-router-dom";
import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { usePlayerSocket } from "../hooks/usePlayerSocket";
import { useGameEvents } from "../hooks/useGameEvents";

export default function PlayQuizPage() {
  const { roomCode } = useParams();

  const queryClient = useQueryClient();

  const refreshQuestion = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ["question", roomCode],
    });
  }, [queryClient, roomCode]);

  usePlayerSocket(roomCode!);
  useGameEvents(roomCode!, refreshQuestion);

  return <Outlet />;
}