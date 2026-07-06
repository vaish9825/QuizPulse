import { v4 as uuid } from "uuid";
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

export async function joinRoom(
  roomCode: string,
  playerName: string
) {
  const room = await Room.findOne({
    roomCode,
  });

  if (!room) {
    throw new Error("Room not found");
  }

  room.players.push({
    id: uuid(),
    name: playerName,
    score: 0,
  });

  await room.save();

  return room;
}