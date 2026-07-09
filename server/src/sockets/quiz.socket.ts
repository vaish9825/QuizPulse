import { Server, Socket } from "socket.io";

import { SOCKET_EVENTS } from "../common/constants/socket-events.js";

import { startGame } from "../features/game/game.service.js";

import {
  startScheduler,
  pauseScheduler,
  resumeScheduler,
  endQuiz,
} from "../features/game/game.scheduler.js";

export function registerQuizSocket(
  io: Server,
  socket: Socket
) {
  socket.on(
    SOCKET_EVENTS.START_QUIZ,
    async (roomCode: string) => {
      try {
        await startGame(roomCode);

        io.to(roomCode).emit(
          SOCKET_EVENTS.QUIZ_STARTED
        );

        await startScheduler(roomCode);
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

  socket.on(
    SOCKET_EVENTS.PAUSE_QUIZ,
    (roomCode: string) => {
      try {
        pauseScheduler(roomCode);
      } catch (error) {
        console.error(error);

        socket.emit(
          SOCKET_EVENTS.QUIZ_ERROR,
          {
            message:
              error instanceof Error
                ? error.message
                : "Unable to pause quiz",
          }
        );
      }
    }
  );

  socket.on(
    SOCKET_EVENTS.RESUME_QUIZ,
    (roomCode: string) => {
      try {
        resumeScheduler(roomCode);
      } catch (error) {
        console.error(error);

        socket.emit(
          SOCKET_EVENTS.QUIZ_ERROR,
          {
            message:
              error instanceof Error
                ? error.message
                : "Unable to resume quiz",
          }
        );
      }
    }
  );

  socket.on(
    SOCKET_EVENTS.END_QUIZ,
    async (roomCode: string) => {
      try {
        await endQuiz(roomCode);
      } catch (error) {
        console.error(error);

        socket.emit(
          SOCKET_EVENTS.QUIZ_ERROR,
          {
            message:
              error instanceof Error
                ? error.message
                : "Unable to end quiz",
          }
        );
      }
    }
  );
}