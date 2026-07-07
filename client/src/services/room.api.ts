import { api } from "./api";

export const roomApi = {
  create(quizId: string) {
    return api.post("/rooms", {
      quizId,
    });
  },

  join(roomCode: string, nickname: string) {
    return api.post(`/rooms/${roomCode}/join`, {
      nickname,
    });
  },
};