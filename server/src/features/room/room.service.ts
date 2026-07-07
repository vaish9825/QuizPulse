import { randomUUID } from "crypto";

import { Room } from "./room.model.js";
import { generateRoomCode } from "../../common/utils/generateRoomCode.js";

export async function createRoom(
  quizId: string,
  hostId: string
) {
  let roomCode = generateRoomCode();

  while (await Room.exists({ roomCode })) {
    roomCode = generateRoomCode();
  }

  return Room.create({
    roomCode,
    quizId,
    hostId,
  });
}

export async function joinRoom(
  roomCode: string,
  nickname: string
) {
  const room = await Room.findOne({ roomCode });

  if (!room) {
    throw new Error("Room not found");
  }

  const alreadyExists = room.players.some(
    (player) =>
      player.nickname.toLowerCase() ===
      nickname.toLowerCase()
  );

  if (alreadyExists) {
    throw new Error("Nickname already taken");
  }

  room.players.push({
    playerId: randomUUID(),
    nickname,
    score: 0,
    joinedAt: new Date(),
    isConnected: true,
  });

  await room.save();

  return room;
}