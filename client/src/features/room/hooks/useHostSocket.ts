import { useEffect } from "react";

import { socket } from "@/lib/socket";

export function useHostSocket(
  roomCode: string,
  onParticipantsUpdated: () => void
) {
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      socket.emit("join-room", roomCode);
    });

    socket.off("participants-updated");

    socket.on(
      "participants-updated",
      onParticipantsUpdated
    );

    return () => {
      socket.off("participants-updated");
    };
  }, [roomCode, onParticipantsUpdated]);
}

export function startQuiz(roomCode: string) {

  socket.emit("start-quiz", roomCode);
}