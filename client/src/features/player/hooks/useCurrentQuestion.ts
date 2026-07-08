import { useQuery } from "@tanstack/react-query";

import { gameApi } from "@/services/game.api";

import type { LiveQuestion } from "../types/question.types";

export function useCurrentQuestion(roomCode: string) {
  return useQuery({
    queryKey: ["question", roomCode],

    queryFn: async () => {
      const response =
        await gameApi.getCurrentQuestion(roomCode);

      return response.data.data as LiveQuestion;
    },

    enabled: !!roomCode,
  });
}