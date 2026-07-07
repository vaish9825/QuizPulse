import { Quiz } from "./quiz.model.js";

export async function createQuiz(data: any) {
  const quiz = await Quiz.create(data);

  return quiz;
}