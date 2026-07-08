import { api } from "./api.js";

export const quizApi = {
  getAll() {
    return api.get("/quizzes");
  },

  getById(id: string) {
    return api.get(`/quizzes/${id}`);
  },

  create(data: unknown) {
    return api.post("/quizzes", data);
  },

  update(id: string, data: unknown) {
    return api.put(`/quizzes/${id}`, data);
  },

  remove(id: string) {
    return api.delete(`/quizzes/${id}`);
  },
};