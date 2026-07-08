import { Server, Socket } from "socket.io";

import { SOCKET_EVENTS } from "../../common/constants/socket-events.js";

import { submitAnswer } from "./game.service.js";

export function registerGameSocket(
  io: Server,
  socket: Socket
) {
  socket.on(
    SOCKET_EVENTS.SUBMIT_ANSWER,
    async (payload) => {
      try {
        const result = await submitAnswer(
          payload
        );

        io.to(payload.roomCode).emit(
          SOCKET_EVENTS.LEADERBOARD_UPDATED,
          result
        );
      } catch (error) {
        console.error(error);

        socket.emit(
          SOCKET_EVENTS.QUIZ_ERROR,
          {
            message:
              error instanceof Error
                ? error.message
                : "Unable to submit answer",
          }
        );
      }
    }
  );
}