import { Server, Socket } from "socket.io";

import { SOCKET_EVENTS } from "../common/constants/socket-events.js";

import { startGame } from "../features/game/game.service.js";
import { startQuestionTimer } from "../features/game/game.timer.js";

export function registerQuizSocket(
  io: Server,
  socket: Socket
) {
  socket.on(
    SOCKET_EVENTS.START_QUIZ,
    async (roomCode: string) => {
      console.log(
        "✅ RECEIVED start-quiz:",
        roomCode
      );

      try {
        const room = await startGame(
          roomCode
        );

        console.log(
          "✅ GAME STARTED"
        );

        console.log(
          "📢 Emitting quiz-started to room:",
          roomCode
        );

        io.to(roomCode).emit(
          SOCKET_EVENTS.QUIZ_STARTED
        );

        startQuestionTimer(roomCode);
      } catch (error) {
        console.error(error);

        socket.emit(
          SOCKET_EVENTS.QUIZ_ERROR,
          {
            message:
              error instanceof Error
                ? error.message
                : "Unable to start quiz",
          }
        );
      }
    }
  );
}