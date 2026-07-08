import { Server, Socket } from "socket.io";

import { SOCKET_EVENTS } from "../common/constants/socket-events.js";

export function registerRoomSocket(
  io: Server,
  socket: Socket
) {
  socket.on(
    SOCKET_EVENTS.JOIN_ROOM,
    (roomCode: string) => {
      socket.join(roomCode);

      console.log(
        `${socket.id} joined room ${roomCode}`
      );

      io.to(roomCode).emit(
        SOCKET_EVENTS.PARTICIPANTS_UPDATED
      );
    }
  );
}