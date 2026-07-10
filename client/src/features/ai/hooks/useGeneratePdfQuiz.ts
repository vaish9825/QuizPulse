import { useMutation } from "@tanstack/react-query";

import { generatePdfQuiz } from "../services/pdf.api";

export function useGeneratePdfQuiz() {
  return useMutation({
    mutationFn: generatePdfQuiz,
  });
}