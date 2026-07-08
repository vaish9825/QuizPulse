import { Server, Socket } from "socket.io";

import { startGame } from "../features/game/game.service.js";

export function registerQuizSocket(
  io: Server,
  socket: Socket
) {
  socket.on("start-quiz", async (roomCode: string) => {
  console.log("✅ RECEIVED start-quiz:", roomCode);

  try {
    const room = await startGame(roomCode);

    console.log("✅ GAME STARTED");

    console.log("📢 Emitting quiz-started to room:", roomCode);

    io.to(roomCode).emit("quiz-started");
  } catch (err) {
    console.error(err);
  }
});
}