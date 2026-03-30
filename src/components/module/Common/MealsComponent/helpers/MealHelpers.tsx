import { Coffee, Sun, Moon } from "lucide-react";

export const getMealIcon = (type: string) => {
  switch (type) {
    case "BREAKFAST":
      return <Coffee className="w-3 h-3 text-chart-1" />;
    case "LUNCH":
      return <Sun className="w-3 h-3 text-chart-2" />;
    case "DINNER":
      return <Moon className="w-3 h-3 text-chart-3" />;
    default:
      return null;
  }
};

export const getMealColor = (type: string) => {
  switch (type) {
    case "BREAKFAST":
      return "bg-chart-1/10 text-chart-1 border-chart-1/20";
    case "LUNCH":
      return "bg-chart-2/10 text-chart-2 border-chart-2/20";
    case "DINNER":
      return "bg-chart-3/10 text-chart-3 border-chart-3/20";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};
