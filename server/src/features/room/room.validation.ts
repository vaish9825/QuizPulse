import { z } from "zod";

export const JoinRoomSchema = z.object({
  name: z
    .string()
    .min(2)
    .max(25),
});