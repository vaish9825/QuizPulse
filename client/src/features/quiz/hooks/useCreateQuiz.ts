import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { quizApi } from "@/services/quiz.api";

export function useCreateQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: quizApi.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["quizzes"],
      });

      toast.success("Quiz created successfully!");
    },

    onError: () => {
      toast.error("Failed to create quiz.");
    },
  });
}