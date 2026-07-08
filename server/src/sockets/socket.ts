import { Server } from "socket.io";

let io: Server;

export function initializeSocket(server: any) {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  return io;
}

export function getIO() {
  return io;
}