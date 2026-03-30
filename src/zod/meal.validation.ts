import { z } from "zod";

export const mealZodSchema = z.object({
  houseId: z.string().min(1, "House is required"),
  monthId: z.string().min(1, "Month is required"),
  userId: z.string().min(1, "Member is required"),
  date: z.string().min(1, "Date is required"),
  mealType: z.enum(["BREAKFAST", "LUNCH", "DINNER"]),
});
