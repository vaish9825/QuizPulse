import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { socket } from "@/lib/socket";
import { SOCKET_EVENTS } from "@/shared/constants/socket-events";

export function useGameEvents(
  roomCode: string,
  refreshQuestion?: () => void
) {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(
      "🎮 useGameEvents mounted:",
      roomCode
    );

    const onQuestionEnded = () => {
      console.log(
        "🟢 QUESTION_ENDED RECEIVED"
      );

      navigate(
        `/play/${roomCode}/leaderboard`
      );
    };

    const onNextQuestion = () => {
      console.log(
        "🔵 NEXT_QUESTION RECEIVED"
      );

      if (refreshQuestion) {
        refreshQuestion();
      }

      navigate(
        `/play/${roomCode}/question`
      );
    };

    const onQuizFinished = (
      payload: any
    ) => {
      console.log(
        "🏁 QUIZ_FINISHED RECEIVED"
      );

      sessionStorage.setItem(
        "finalLeaderboard",
        JSON.stringify(
          payload.leaderboard
        )
      );

      navigate(
        `/play/${roomCode}/results`
      );
    };

    socket.on(
      SOCKET_EVENTS.QUESTION_ENDED,
      onQuestionEnded
    );

    socket.on(
      SOCKET_EVENTS.NEXT_QUESTION,
      onNextQuestion
    );

    socket.on(
      SOCKET_EVENTS.QUIZ_FINISHED,
      onQuizFinished
    );

    return () => {
      console.log(
        "❌ useGameEvents unmounted:",
        roomCode
      );

      socket.off(
        SOCKET_EVENTS.QUESTION_ENDED,
        onQuestionEnded
      );

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
    roomCode,
    navigate,
    refreshQuestion,
  ]);
}