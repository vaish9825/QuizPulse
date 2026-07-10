import axios from "axios";

const API =
  import.meta.env.VITE_API_URL ??
  "http://localhost:5000";

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
  const { data } = await axios.post(
    `${API}/api/ai/generate/topic`,
    payload
  );

  return data.quiz;
}