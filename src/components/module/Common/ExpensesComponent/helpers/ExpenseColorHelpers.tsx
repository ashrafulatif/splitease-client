import {
  Utensils,
  Home,
  Flame,
  Zap,
  Globe,
  Droplets,
  CircleEllipsis,
} from "lucide-react";
import { IExpense } from "@/types/expense.types";

export const getExpenseIcon = (type: IExpense["type"]) => {
  switch (type) {
    case "MEAL":
      return <Utensils className="w-5 h-5 text-chart-1" />;
    case "RENT":
      return <Home className="w-5 h-5 text-chart-2" />;
    case "GAS":
      return <Flame className="w-5 h-5 text-chart-3" />;
    case "ELECTRICITY":
      return <Zap className="w-5 h-5 text-chart-4" />;
    case "INTERNET":
      return <Globe className="w-5 h-5 text-chart-5" />;
    case "WATER":
      return <Droplets className="w-5 h-5 text-primary" />;
    default:
      return <CircleEllipsis className="w-5 h-5 text-muted-foreground" />;
  }
};

export const getExpenseBg = (type: IExpense["type"]) => {
  switch (type) {
    case "MEAL":
      return "bg-chart-1/10 border-chart-1/20";
    case "RENT":
      return "bg-chart-2/10 border-chart-2/20";
    case "GAS":
      return "bg-chart-3/10 border-chart-3/20";
    case "ELECTRICITY":
      return "bg-chart-4/10 border-chart-4/20";
    case "INTERNET":
      return "bg-chart-5/10 border-chart-5/20";
    case "WATER":
      return "bg-primary/10 border-primary/20";
    default:
      return "bg-muted/50 border-muted/50";
  }
};
