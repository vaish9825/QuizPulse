import { Quiz } from "./quiz.model.js";

export async function createQuiz(data: object) {
  return Quiz.create(data);
}

export async function getAllQuizzes() {
  return Quiz.find().sort({ createdAt: -1 });
}

export async function getQuizById(id: string) {
  return Quiz.findById(id);
}

export async function updateQuiz(id: string, data: object) {
  return Quiz.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

export async function deleteQuiz(id: string) {
  return Quiz.findByIdAndDelete(id);
}