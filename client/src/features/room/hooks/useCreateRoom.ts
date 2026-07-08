import { useMutation } from "@tanstack/react-query";

import { roomApi } from "@/services/room.api";

export function useCreateRoom() {
  return useMutation({
    mutationFn: roomApi.create,
  });
}