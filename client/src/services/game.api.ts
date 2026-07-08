import { api } from "./api";

export const gameApi = {
  getCurrentQuestion(roomCode: string) {
    return api.get(`/game/${roomCode}/question`);
  },
};