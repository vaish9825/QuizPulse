import { Server, Socket } from "socket.io";

export function registerRoomSocket(
  io: Server,
  socket: Socket
) {
  socket.on("join-room", (roomCode: string) => {
    socket.join(roomCode);

    console.log(
      `${socket.id} joined room ${roomCode}`
    );

    io.to(roomCode).emit("participants-updated");
  });
}