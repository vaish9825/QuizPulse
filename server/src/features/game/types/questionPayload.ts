export interface QuestionPayload {
  index: number;
  totalQuestions: number;

  question: string;

  options: string[];

  duration: number;
}