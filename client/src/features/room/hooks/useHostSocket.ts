import { useEffect } from "react";

import { socket } from "@/lib/socket";
import { SOCKET_EVENTS } from "@/shared/constants/socket-events";

export function useHostSocket(
  roomCode: string,
  onParticipantsUpdated: () => void
) {
  useEffect(() => {
    socket.connect();

    const onConnect = () => {
      socket.emit(
        SOCKET_EVENTS.JOIN_ROOM,
        roomCode
      );
    };

    socket.on(
      SOCKET_EVENTS.CONNECT,
      onConnect
    );

    socket.off(
      SOCKET_EVENTS.PARTICIPANTS_UPDATED
    );

    socket.on(
      SOCKET_EVENTS.PARTICIPANTS_UPDATED,
      onParticipantsUpdated
    );

    return () => {
      socket.off(
        SOCKET_EVENTS.CONNECT,
        onConnect
      );

      socket.off(
        SOCKET_EVENTS.PARTICIPANTS_UPDATED,
        onParticipantsUpdated
      );
    };
  }, [roomCode, onParticipantsUpdated]);
}

export function startQuiz(
  roomCode: string
) {
  socket.emit(
    SOCKET_EVENTS.START_QUIZ,
    roomCode
  );
}