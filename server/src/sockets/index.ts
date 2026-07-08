import { Server } from "socket.io";
import { registerGameSocket } from "../features/game/game.socket.js";
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
    registerGameSocket(io, socket);

    socket.on("disconnect", () => {
      console.log(
        "Client Disconnected:",
        socket.id
      );
    });
  });
}