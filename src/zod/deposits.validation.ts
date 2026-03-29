import { z } from "zod";

export const depositZodSchema = z.object({
  houseId: z.string().min(1, "House is required"),
  monthId: z.string().min(1, "Month is required"),
  userId: z.string().min(1, "Member is required"),
  amount: z.coerce.number().min(1, "Amount must be at least 1"),
  note: z.string().optional(),
});
