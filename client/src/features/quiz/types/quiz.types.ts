export interface QuestionFormData {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface CreateQuizFormData {
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  createdBy: string;
  questions: QuestionFormData[];
}