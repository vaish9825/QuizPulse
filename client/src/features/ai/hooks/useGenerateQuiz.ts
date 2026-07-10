import { useMutation } from "@tanstack/react-query";

import { generateQuiz } from "../services/ai.api";

export function useGenerateQuiz() {
  return useMutation({
    mutationFn: generateQuiz,
  });
}