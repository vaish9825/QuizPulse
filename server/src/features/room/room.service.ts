import { Room } from "./room.model.js";
import { generateRoomCode } from "../../common/utils/generateRoomCode.js";

export async function createRoom(hostId: string) {
  let roomCode = generateRoomCode();

  while (await Room.exists({ roomCode })) {
    roomCode = generateRoomCode();
  }

  const room = await Room.create({
    roomCode,
    hostId,
  });

  return room;
}