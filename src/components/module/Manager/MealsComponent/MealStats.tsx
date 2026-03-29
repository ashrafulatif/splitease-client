import { Coffee, Sun, Moon } from "lucide-react";
import { IMealRecord } from "@/types/meal.types";

export const MealStats = ({ meals = [] }: { meals?: IMealRecord[] }) => {
  const breakfasts = meals.filter((m) => m.mealType === "BREAKFAST").length;
  const lunches = meals.filter((m) => m.mealType === "LUNCH").length;
  const dinners = meals.filter((m) => m.mealType === "DINNER").length;

  return (
    <div className="flex flex-col gap-4">
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        MONTHLY SUMMARY
      </span>
      <div className="flex gap-4">
        <div className="flex flex-col items-center p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 w-24">
          <Coffee className="w-5 h-5 text-amber-500 mb-1" />
          <span className="text-xl font-bold text-amber-600 block">
            {breakfasts}
          </span>
        </div>
        <div className="flex flex-col items-center p-3 rounded-2xl bg-orange-500/10 border border-orange-500/20 w-24">
          <Sun className="w-5 h-5 text-orange-500 mb-1" />
          <span className="text-xl font-bold text-orange-600 block">
            {lunches}
          </span>
        </div>
        <div className="flex flex-col items-center p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 w-24">
          <Moon className="w-5 h-5 text-indigo-500 mb-1" />
          <span className="text-xl font-bold text-indigo-600 block">
            {dinners}
          </span>
        </div>
      </div>
    </div>
  );
};
