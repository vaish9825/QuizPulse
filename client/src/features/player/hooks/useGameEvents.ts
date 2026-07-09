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

  onPause?: () => void;

  onResume?: (
    remainingTime: number
  ) => void;
}

export function useGameEvents({
  roomCode,
  refreshQuestion,
  revealAnswer,
  onPause,
  onResume,
}: Props) {
  const navigate = useNavigate();

  useEffect(() => {

    const onQuestionEnded = (
      payload: {
        correctAnswer: number;
      }
    ) => {
      revealAnswer?.(
        payload.correctAnswer
      );
    };

    const onLeaderboardUpdated = (
      payload: any
    ) => {
      sessionStorage.setItem(
        "leaderboard",
        JSON.stringify(payload)
      );
    };

    const onShowLeaderboard = () => {
      navigate(
        `/play/${roomCode}/leaderboard`
      );
    };

    const handlePause = () => {
      onPause?.();
    };

    const handleResume = (
      payload: {
        remainingTime: number;
      }
    ) => {
      onResume?.(
        payload.remainingTime
      );
    };

    const onNextQuestion = () => {

      sessionStorage.removeItem(
        "leaderboard"
      );

      refreshQuestion?.();

      navigate(
        `/play/${roomCode}/question`
      );
    };

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
      SOCKET_EVENTS.QUIZ_PAUSED,
      handlePause
    );

    socket.on(
      SOCKET_EVENTS.QUIZ_RESUMED,
      handleResume
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
        SOCKET_EVENTS.QUIZ_PAUSED,
        handlePause
      );

      socket.off(
        SOCKET_EVENTS.QUIZ_RESUMED,
        handleResume
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
    onPause,
    onResume,
  ]);
}