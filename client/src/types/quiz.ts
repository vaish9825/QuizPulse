export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Quiz {
  _id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  questions: Question[];
  source: "manual" | "ai";
}