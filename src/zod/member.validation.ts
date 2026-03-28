import { z } from "zod";

export const memberZodSchema = z.object({
  houseId: z.string().min(1, "House is required"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
});
