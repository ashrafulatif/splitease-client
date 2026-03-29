import { z } from "zod";

export const monthZodSchema = z.object({
  houseId: z.string().min(1, "House is required"),
  name: z.string().min(1, "Month name is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
});
