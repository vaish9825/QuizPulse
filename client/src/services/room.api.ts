import { api } from "@/lib/api";

export const roomApi = {
  create(quizId: string) {
    return api.post("/rooms", {
      quizId,
      hostId: "demo-host",
    });
  },

  join(roomCode: string, nickname: string) {
    return api.post(`/rooms/${roomCode}/join`, {
      nickname,
    });
  },

  get(roomCode: string) {
    return api.get(`/rooms/${roomCode}`);
  },
};