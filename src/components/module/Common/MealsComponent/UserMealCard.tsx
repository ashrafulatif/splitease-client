/* eslint-disable @typescript-eslint/no-explicit-any */
import { Coffee, Sun, Moon, MoreHorizontal, Pencil, Trash2, CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getMealColor, getMealIcon } from "./helpers/MealHelpers";

export const UserMealCard = ({
  user,
  meals,
  onEdit,
  onDelete,
}: {
  user: any;
  meals: any[];
  onEdit: (meal: any) => void;
  onDelete: (meal: any) => void;
}) => {
  const breakfasts = meals.filter((m) => m.mealType === "BREAKFAST").length;
  const lunches = meals.filter((m) => m.mealType === "LUNCH").length;
  const dinners = meals.filter((m) => m.mealType === "DINNER").length;

  const sortedMeals = [...meals].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="flex flex-col bg-card rounded-3xl border shadow-sm hover:shadow-md transition-shadow">
      {/* Card Header -> User Info */}
      <div className="p-5 border-b bg-muted/20 flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex justify-center items-center font-bold text-lg border border-primary/20">
            {user.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="flex flex-col">
            <h3 className="font-semibold text-lg leading-tight">{user.name}</h3>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </div>
        <Badge variant="secondary" className="font-semibold rounded-lg bg-background border">
          {meals.length} Meals
        </Badge>
      </div>

      {/* Card Body -> Mini Stats */}
      <div className="grid grid-cols-3 gap-0 border-b divide-x">
        <div className="flex flex-col items-center py-3 bg-amber-50/30 dark:bg-amber-950/20">
          <span className="text-xs font-semibold text-muted-foreground tracking-wider mb-1">
            BREAKFAST
          </span>
          <span className="text-lg font-bold text-amber-600">{breakfasts}</span>
        </div>
        <div className="flex flex-col items-center py-3 bg-orange-50/30 dark:bg-orange-950/20">
          <span className="text-xs font-semibold text-muted-foreground tracking-wider mb-1">
            LUNCH
          </span>
          <span className="text-lg font-bold text-orange-600">{lunches}</span>
        </div>
        <div className="flex flex-col items-center py-3 bg-indigo-50/30 dark:bg-indigo-950/20">
          <span className="text-xs font-semibold text-muted-foreground tracking-wider mb-1">
            DINNER
          </span>
          <span className="text-lg font-bold text-indigo-600">{dinners}</span>
        </div>
      </div>

      {/* Accordion for Meal List */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="meals" className="border-none">
          <AccordionTrigger className="px-5 py-3 hover:bg-muted/30 text-sm font-medium hover:no-underline">
            View Entry Details
          </AccordionTrigger>
          <AccordionContent className="p-0 border-t">
            {sortedMeals.length === 0 ? (
              <div className="flex flex-col items-center py-6 text-muted-foreground">
                <CalendarDays className="w-8 h-8 opacity-20 mb-2" />
                <span className="text-sm">No recorded meals</span>
              </div>
            ) : (() => {
              const grouped: Record<string, any[]> = {};
              sortedMeals.forEach((meal) => {
                const key = new Date(meal.date).toISOString().split("T")[0];
                if (!grouped[key]) grouped[key] = [];
                grouped[key].push(meal);
              });
              const dates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

              return (
                <ScrollArea className="h-[220px]">
                  <div className="flex flex-col divide-y">
                    {dates.map((dateKey) => {
                      const dayMeals = grouped[dateKey];
                      const displayDate = new Intl.DateTimeFormat("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      }).format(new Date(dateKey + "T00:00:00"));

                      return (
                        <div
                          key={dateKey}
                          className="flex items-center justify-between px-5 py-3 hover:bg-muted/30 transition-colors gap-3"
                        >
                          {/* Date + all meal badges for that day side by side */}
                          <div className="flex flex-wrap items-center gap-2 min-w-0">
                            <span className="text-[11px] font-semibold text-muted-foreground shrink-0">
                              {displayDate}
                            </span>
                            {dayMeals.map((meal: any) => (
                              <span
                                key={meal.id || meal._id}
                                className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase inline-flex items-center gap-1 border ${getMealColor(meal.mealType)}`}
                              >
                                {getMealIcon(meal.mealType)}
                                {meal.mealType}
                              </span>
                            ))}
                          </div>

                          {/* Single ⋯ button — dropdown lists  */}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                className="h-7 w-7 p-0 rounded-full hover:bg-muted focus-visible:ring-0 shrink-0"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="rounded-xl p-1.5 min-w-[200px]">
                              {dayMeals.map((meal: any) => (
                                <div
                                  key={meal.id || meal._id}
                                  className="flex items-center justify-between gap-2 px-2 py-1.5 rounded-lg hover:bg-muted/50"
                                >
                                  {/* Meal badge */}
                                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase inline-flex items-center gap-1 border shrink-0 ${getMealColor(meal.mealType)}`}>
                                    {getMealIcon(meal.mealType)}
                                    {meal.mealType}
                                  </span>
                                  {/* Inline Edit | Delete */}
                                  <div className="flex items-center gap-1">
                                    <button
                                      onClick={() => onEdit(meal)}
                                      className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground hover:text-foreground px-1.5 py-0.5 rounded-md hover:bg-muted transition-colors"
                                    >
                                      <Pencil className="w-3 h-3" />
              
                                    </button>
                                    <span className="text-border text-xs">|</span>
                                    <button
                                      onClick={() => onDelete(meal)}
                                      className="flex items-center gap-1 text-[11px] font-medium text-destructive hover:text-destructive px-1.5 py-0.5 rounded-md hover:bg-destructive/10 transition-colors"
                                    >
                                      <Trash2 className="w-3 h-3" />
    
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              );
            })()}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
