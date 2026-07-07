import { z } from "zod";

const questionSchema = z.object({
  question: z.string().min(5, "Question is required"),

  options: z
    .array(z.string().min(1))
    .length(4),

  correctAnswer: z.number().min(0).max(3),
});

export const createQuizSchema = z.object({
  title: z.string().min(3),

  description: z.string(),

  difficulty: z.enum([
    "easy",
    "medium",
    "hard",
  ]),

  createdBy: z.string().min(2),

  questions: z.array(questionSchema).min(1),
});

export type CreateQuizSchema =
  z.infer<typeof createQuizSchema>;