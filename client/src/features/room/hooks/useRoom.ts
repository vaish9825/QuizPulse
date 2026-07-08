import { useQuery } from "@tanstack/react-query";

import { roomApi } from "@/services/room.api";
import type { Room } from "@/types/game"; // or "@/types/room"

export function useRoom(roomCode: string) {
  return useQuery({
    queryKey: ["room", roomCode],

    queryFn: async () => {
      const response = await roomApi.get(roomCode);

      return response.data.data as Room;
    },

    enabled: !!roomCode,
  });
}