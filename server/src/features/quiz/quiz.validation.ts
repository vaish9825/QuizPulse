import { z } from "zod";

const QuestionSchema = z.object({
  question: z.string().min(5).max(300),

  type: z.enum(["mcq", "true_false"]),

  options: z.array(z.string()).min(2),

  correctAnswer: z.number().nonnegative(),

  explanation: z.string().optional(),

  points: z.number().positive().default(100),

  timeLimit: z.number().positive().default(20),
});

export const CreateQuizSchema = z.object({
  title: z.string().min(3).max(100),

  description: z.string().optional(),

  difficulty: z.enum([
    "easy",
    "medium",
    "hard",
  ]),

  questions: z.array(QuestionSchema).min(1),
});