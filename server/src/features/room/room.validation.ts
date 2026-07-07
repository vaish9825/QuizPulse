import { z } from "zod";

export const CreateRoomSchema = z.object({
  quizId: z.string().min(1),
  hostId: z.string().default("anonymous"),
});

export const JoinRoomSchema = z.object({
  nickname: z
    .string()
    .min(2, "Nickname must be at least 2 characters")
    .max(25),
});

export type CreateRoomInput = z.infer<typeof CreateRoomSchema>;
export type JoinRoomInput = z.infer<typeof JoinRoomSchema>;