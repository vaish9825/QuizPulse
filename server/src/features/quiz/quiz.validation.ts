import { z } from "zod";

export const QuestionSchema = z.object({
  question: z.string().min(5).max(300),

  type: z.enum(["mcq", "true_false"]).default("mcq"),

  options: z.array(z.string()).min(2),

  correctAnswer: z.number().nonnegative(),

  explanation: z.string().optional(),

  points: z.number().positive().default(100),

  timeLimit: z.number().positive().default(20),
});

export const CreateQuizSchema = z.object({
  title: z.string().min(3),

  description: z.string().default(""),

  difficulty: z
    .enum(["easy", "medium", "hard"])
    .default("easy"),

  questions: z.array(QuestionSchema),

  createdBy: z
    .string()
    .default("anonymous"),
});

export const UpdateQuizSchema =
  CreateQuizSchema.partial();

export type CreateQuizInput = z.infer<typeof CreateQuizSchema>;
export type UpdateQuizInput = z.infer<typeof UpdateQuizSchema>;