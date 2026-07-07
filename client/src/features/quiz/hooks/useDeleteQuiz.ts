import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { quizApi } from "@/services/quiz.api";

export function useDeleteQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: quizApi.remove,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["quizzes"],
      });

      toast.success("Quiz deleted successfully!");
    },

    onError: () => {
      toast.error("Failed to delete quiz.");
    },
  });
}