import { Wallet, PieChart, TrendingUp } from "lucide-react";
import { IExpense } from "@/types/expense.types";

export const ExpenseStats = ({ expenses = [] }: { expenses?: IExpense[] }) => {
  const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="flex flex-col gap-4">
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        CORE OVERHEADS
      </span>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex flex-col items-start p-4 rounded-2xl bg-muted/40 border border-border min-w-45">
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="w-5 h-5 text-primary" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-tight">
              Total Monthly Bills
            </span>
          </div>
          <span className="text-2xl font-bold text-foreground block">
            ৳{totalAmount.toLocaleString()}
          </span>
          <div className="flex items-center gap-1 mt-1 text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">
            <TrendingUp className="w-3 h-3" />
            Aggregated Costs
          </div>
        </div>

        <div className="flex flex-col items-start p-4 rounded-2xl bg-muted/40 border border-border min-w-45">
          <div className="flex items-center gap-2 mb-2">
            <PieChart className="w-5 h-5 text-primary" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-tight">
              Categories
            </span>
          </div>
          <span className="text-2xl font-bold text-foreground block">
            {new Set(expenses.map((e) => e.type)).size}
          </span>
          <div className="mt-1 text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">
            Expense Types
          </div>
        </div>
      </div>
    </div>
  );
};
