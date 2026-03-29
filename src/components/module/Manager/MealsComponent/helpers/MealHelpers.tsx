import { Coffee, Sun, Moon } from "lucide-react";

export const getMealIcon = (type: string) => {
  switch (type) {
    case "BREAKFAST":
      return <Coffee className="w-3 h-3 text-amber-500" />;
    case "LUNCH":
      return <Sun className="w-3 h-3 text-orange-500" />;
    case "DINNER":
      return <Moon className="w-3 h-3 text-indigo-500" />;
    default:
      return null;
  }
};

export const getMealColor = (type: string) => {
  switch (type) {
    case "BREAKFAST":
      return "bg-amber-500/10 text-amber-600 border-amber-500/20";
    case "LUNCH":
      return "bg-orange-500/10 text-orange-600 border-orange-500/20";
    case "DINNER":
      return "bg-indigo-500/10 text-indigo-600 border-indigo-500/20";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};