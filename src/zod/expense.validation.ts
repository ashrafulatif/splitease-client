import { z } from "zod";

export const expenseZodSchema = z.object({
  houseId: z.string().min(1, "House is required"),
  monthId: z.string().min(1, "Month is required"),
  type: z.enum(["MEAL", "RENT", "GAS", "ELECTRICITY", "INTERNET", "WATER", "OTHER"], {
    message: "Please select a valid expense category",
  }),
  amount: z.coerce.number().min(1, "Amount must be at least 1"),
  description: z.string().min(1, "Description is required"),
});
