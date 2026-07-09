import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { socket } from "@/lib/socket";
import { SOCKET_EVENTS } from "@/shared/constants/socket-events";

interface Props {
  roomCode: string;
  refreshQuestion?: () => void;
  revealAnswer?: (
    correctAnswer: number
  ) => void;
}

export function useGameEvents({
  roomCode,
  refreshQuestion,
  revealAnswer,
}: Props) {
  const navigate = useNavigate();

  useEffect(() => {
    // Reveal answer
    const onQuestionEnded = (
      payload: {
        correctAnswer: number;
      }
    ) => {
      revealAnswer?.(
        payload.correctAnswer
      );
    };

    // Cache leaderboard as soon as server sends it
    const onLeaderboardUpdated = (
      payload: any
    ) => {
      sessionStorage.setItem(
        "leaderboard",
        JSON.stringify(payload)
      );
    };

    // Navigate only when server says so
    const onShowLeaderboard = () => {
      navigate(
        `/play/${roomCode}/leaderboard`
      );
    };

    // Next question
    const onNextQuestion = () => {
      sessionStorage.removeItem(
        "leaderboard"
      );

      refreshQuestion?.();

      navigate(
        `/play/${roomCode}/question`
      );
    };

    // Quiz finished
    const onQuizFinished = (
      payload: any
    ) => {
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
      SOCKET_EVENTS.LEADERBOARD_UPDATED,
      onLeaderboardUpdated
    );

    socket.on(
      SOCKET_EVENTS.SHOW_LEADERBOARD,
      onShowLeaderboard
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
      socket.off(
        SOCKET_EVENTS.QUESTION_ENDED,
        onQuestionEnded
      );

      socket.off(
        SOCKET_EVENTS.LEADERBOARD_UPDATED,
        onLeaderboardUpdated
      );

      socket.off(
        SOCKET_EVENTS.SHOW_LEADERBOARD,
        onShowLeaderboard
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
    revealAnswer,
  ]);
}