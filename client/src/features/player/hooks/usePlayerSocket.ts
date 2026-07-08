import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { socket } from "@/lib/socket";
import { SOCKET_EVENTS } from "@/shared/constants/socket-events";

export function usePlayerSocket(
  roomCode: string
) {
  const navigate = useNavigate();

  useEffect(() => {
    socket.connect();

    const onConnect = () => {
      socket.emit(
        SOCKET_EVENTS.JOIN_ROOM,
        roomCode
      );
    };

    const onQuizStarted = () => {
      navigate(
        `/play/${roomCode}/question`
      );
    };

    socket.on(
      SOCKET_EVENTS.CONNECT,
      onConnect
    );

    socket.on(
      SOCKET_EVENTS.QUIZ_STARTED,
      onQuizStarted
    );

    return () => {
      socket.off(
        SOCKET_EVENTS.CONNECT,
        onConnect
      );

      socket.off(
        SOCKET_EVENTS.QUIZ_STARTED,
        onQuizStarted
      );
    };
  }, [roomCode, navigate]);
}