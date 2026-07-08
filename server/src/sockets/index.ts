import { Server } from "socket.io";

import { registerRoomSocket } from "./room.socket.js";
import { registerQuizSocket } from "./quiz.socket.js";

export function registerSocketEvents(
  io: Server
) {
  io.on("connection", (socket) => {
    console.log(
      "Client Connected:",
      socket.id
    );

    registerRoomSocket(io, socket);
    registerQuizSocket(io, socket);

    socket.on("disconnect", () => {
      console.log(
        "Client Disconnected:",
        socket.id
      );
    });
  });
}