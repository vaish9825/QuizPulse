import { useMutation } from "@tanstack/react-query";

import { roomApi } from "@/services/room.api";

export function useJoinRoom() {
  return useMutation({
    mutationFn: ({
      roomCode,
      nickname,
    }: {
      roomCode: string;
      nickname: string;
    }) =>
      roomApi.join(roomCode, nickname),
  });
}