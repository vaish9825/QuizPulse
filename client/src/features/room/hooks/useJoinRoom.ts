import { useMutation } from "@tanstack/react-query";

import { roomApi } from "@/services/room.api";

interface JoinRoomInput {
  roomCode: string;
  nickname: string;
}

export function useJoinRoom() {
  return useMutation({
    mutationFn: async ({
      roomCode,
      nickname,
    }: JoinRoomInput) => {
      const response = await roomApi.join(
        roomCode,
        nickname
      );

      return response.data;
    },
  });
}