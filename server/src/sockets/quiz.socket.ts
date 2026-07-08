import { Server, Socket } from "socket.io";

import { Room } from "../features/room/room.model.js";

export function registerQuizSocket(
  io: Server,
  socket: Socket
) {
  socket.on(
    "start-quiz",
    async (roomCode: string) => {
      const room = await Room.findOne({
        roomCode,
      });

      if (!room) return;

      room.status = "live";
      room.currentQuestionIndex = 0;
      room.currentQuestionStartedAt = new Date();

      await room.save();

      io.to(roomCode).emit(
        "quiz-started",
        room
      );
    }
  );
}