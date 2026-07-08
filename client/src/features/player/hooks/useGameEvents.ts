import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { socket } from "@/lib/socket";
import { SOCKET_EVENTS } from "@/shared/constants/socket-events";

export function useGameEvents(
  roomCode: string,
  refreshQuestion: () => void
) {
  const navigate = useNavigate();

  useEffect(() => {
    const onNextQuestion = () => {
      refreshQuestion();
    };

    const onQuizFinished = () => {
      navigate(`/play/${roomCode}/results`);
    };

    socket.on(
      SOCKET_EVENTS.NEXT_QUESTION,
      onNextQuestion
    );

    socket.on(
      SOCKET_EVENTS.QUIZ_FINISHED,
      onQuizFinished
    );

    return () => {
      socket.off(
        SOCKET_EVENTS.NEXT_QUESTION,
        onNextQuestion
      );

      socket.off(
        SOCKET_EVENTS.QUIZ_FINISHED,
        onQuizFinished
      );
    };
  }, [
    navigate,
    refreshQuestion,
    roomCode,
  ]);
}