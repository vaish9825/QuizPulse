import { useQuery } from "@tanstack/react-query";

import { quizApi } from "@/services/quiz.api";
import type { Quiz } from "@/types/quiz";

export function useQuizzes() {
  return useQuery<Quiz[]>({
    queryKey: ["quizzes"],

    queryFn: async () => {
      const response = await quizApi.getAll();
      return response.data.data;
    },
  });
}