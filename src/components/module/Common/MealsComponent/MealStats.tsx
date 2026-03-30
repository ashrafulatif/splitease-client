import { Coffee, Sun, Moon } from "lucide-react";
import { IMealRecord } from "@/types/meal.types";

export const MealStats = ({
  meals = [],
  mealRate,
}: {
  meals?: IMealRecord[];
  mealRate?: number;
}) => {
  const breakfasts = meals.filter((m) => m.mealType === "BREAKFAST").length;
  const lunches = meals.filter((m) => m.mealType === "LUNCH").length;
  const dinners = meals.filter((m) => m.mealType === "DINNER").length;

  return (
    <div className="flex flex-col gap-4">
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        MONTHLY SUMMARY
      </span>
      <div className="flex gap-4">
        <div className="flex flex-col items-center p-3 rounded-2xl bg-chart-1/10 border border-chart-1/20 w-24">
          <Coffee className="w-5 h-5 text-chart-1 mb-1" />
          <span className="text-xl font-bold text-chart-1 block">
            {breakfasts}
          </span>
        </div>
        <div className="flex flex-col items-center p-3 rounded-2xl bg-chart-2/10 border border-chart-2/20 w-24">
          <Sun className="w-5 h-5 text-chart-2 mb-1" />
          <span className="text-xl font-bold text-chart-2 block">
            {lunches}
          </span>
        </div>
        <div className="flex flex-col items-center p-3 rounded-2xl bg-chart-3/10 border border-chart-3/20 w-24">
          <Moon className="w-5 h-5 text-chart-3 mb-1" />
          <span className="text-xl font-bold text-chart-3 block">
            {dinners}
          </span>
        </div>
        <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-chart-4/10 border border-chart-4/20 min-w-28">
          <span className="text-[10px] font-semibold text-chart-4 uppercase tracking-wider mb-1">
            Meal Rate
          </span>
          <span className="text-xl font-bold text-chart-4 block">
            {typeof mealRate === "number" ? mealRate.toFixed(2) : "0.00"}
          </span>
        </div>
      </div>
    </div>
  );
};
