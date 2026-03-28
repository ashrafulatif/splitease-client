import { z } from "zod";

export const houseZodSchema = z.object({
  name: z.string().min(1, "House name is required"),
  description: z.string().optional(),
});
