import { useEffect } from "react";
import { socket } from "@/lib/socket";

export function usePlayerSocket(
  roomCode: string,
  onQuizStarted: () => void
) {
  useEffect(() => {
    socket.connect();

    socket.emit("join-room", roomCode);

    socket.on(
      "quiz-started",
      onQuizStarted
    );

    return () => {
      socket.off(
        "quiz-started",
        onQuizStarted
      );
    };
  }, [roomCode, onQuizStarted]);
}