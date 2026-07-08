import { socket } from "@/lib/socket";
import { SOCKET_EVENTS } from "@/shared/constants/socket-events";

export function submitAnswer(
  roomCode: string,
  answer: number
) {
  const playerId =
    localStorage.getItem("playerId");

  if (!playerId) {
    console.error("Player ID not found.");
    return;
  }

  socket.emit(
    SOCKET_EVENTS.SUBMIT_ANSWER,
    {
      roomCode,
      playerId,
      answer,
    }
  );
}