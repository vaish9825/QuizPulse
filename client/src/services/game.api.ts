import { api } from "@/lib/api";

export const gameApi = {
  getCurrentQuestion(roomCode: string) {
    return api.get(`/game/${roomCode}/question`);
  },
};