import { api } from "@/lib/api";

export async function generateQuiz(
  payload: {
    topic: string;
    difficulty:
      | "easy"
      | "medium"
      | "hard";
    questions: number;
  }
) {
  const { data } = await api.post(
  "/ai/generate/topic",
  payload
);

  return data.quiz;
}