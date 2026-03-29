import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IExpense } from "@/types/expense.types";
import { 
  MoreVertical, 
  Pencil, 
  Trash2, 
  Utensils, 
  Home, 
  Flame, 
  Zap, 
  Globe, 
  Droplets, 
  CircleEllipsis,
  CalendarDays
} from "lucide-react";

const getExpenseIcon = (type: IExpense["type"]) => {
  switch (type) {
    case "MEAL": return <Utensils className="w-5 h-5 text-emerald-500" />;
    case "RENT": return <Home className="w-5 h-5 text-blue-500" />;
    case "GAS": return <Flame className="w-5 h-5 text-orange-500" />;
    case "ELECTRICITY": return <Zap className="w-5 h-5 text-amber-500" />;
    case "INTERNET": return <Globe className="w-5 h-5 text-indigo-500" />;
    case "WATER": return <Droplets className="w-5 h-5 text-cyan-500" />;
    default: return <CircleEllipsis className="w-5 h-5 text-muted-foreground" />;
  }
};

const getExpenseBg = (type: IExpense["type"]) => {
  switch (type) {
    case "MEAL": return "bg-emerald-500/10 border-emerald-500/20";
    case "RENT": return "bg-blue-500/10 border-blue-500/20";
    case "GAS": return "bg-orange-500/10 border-orange-500/20";
    case "ELECTRICITY": return "bg-amber-500/10 border-amber-500/20";
    case "INTERNET": return "bg-indigo-500/10 border-indigo-500/20";
    case "WATER": return "bg-cyan-500/10 border-cyan-500/20";
    default: return "bg-muted/50 border-muted/50";
  }
};

export const ExpenseCard = ({
  expense,
  onEdit,
  onDelete,
}: {
  expense: IExpense;
  onEdit: (expense: IExpense) => void;
  onDelete: (expense: IExpense) => void;
}) => {
  const displayDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(expense.createdAt));

  return (
    <div className="flex flex-col bg-card rounded-3xl border shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className="p-5 flex justify-between items-start">
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm ${getExpenseBg(expense.type)}`}>
            {getExpenseIcon(expense.type)}
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-lg tracking-tight leading-tight group-hover:text-primary transition-colors">
              {expense.type}
            </h3>
            <div className="flex items-center gap-1.5 mt-1 text-muted-foreground/60">
               <CalendarDays className="w-3 h-3" />
               <span className="text-[11px] font-bold uppercase tracking-wider">{displayDate}</span>
            </div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-9 w-9 p-0 rounded-full hover:bg-muted focus-visible:ring-0 shrink-0"
            >
              <MoreVertical className="h-5 w-5 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-2xl p-2 min-w-[160px] shadow-xl border animate-in fade-in slide-in-from-top-2 duration-200">
            <button
              onClick={() => onEdit(expense)}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl transition-colors"
            >
              <Pencil className="w-4 h-4" />
              Edit Expense
            </button>
            <button
              onClick={() => onDelete(expense)}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-semibold text-destructive hover:bg-destructive/10 rounded-xl transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Remove Record
            </button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="px-5 pb-5">
        <div className="flex flex-col bg-muted/30 rounded-2xl p-4 border border-dashed">
           <span className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase mb-1 opacity-70">Expenditure</span>
           <span className="text-2xl font-black tracking-tighter text-foreground/90">
              ৳{expense.amount.toLocaleString()}
           </span>
           {expense.description && (
             <p className="mt-3 text-[12px] leading-relaxed text-muted-foreground font-medium italic border-t pt-3 border-muted-foreground/10">
                "{expense.description}"
             </p>
           )}
        </div>
      </div>
    </div>
  );
};
