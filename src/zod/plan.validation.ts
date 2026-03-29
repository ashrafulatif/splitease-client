import { z } from "zod";

export const planZodSchema = z.object({
  name: z.string().min(1, "Plan name is required"),
  price: z.number().min(0, "Price must be at least 0"),
  durationDays: z.number().min(1, "Duration must be at least 1 day"),
  features: z.array(z.string().min(1, "Feature cannot be empty")).min(1, "At least one feature is required"),
});
