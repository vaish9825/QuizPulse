export interface GenerateQuizRequest {
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  questions: number;
}