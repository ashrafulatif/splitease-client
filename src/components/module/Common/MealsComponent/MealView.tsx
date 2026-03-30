/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { AddMealModal } from "./AddMealModal";
import { RemoveMealDialog } from "./RemoveMealDialog";
import { UpdateMealModal } from "./UpdateMealModal";
import { MealFilters } from "./MealFilters";
import { MealStats } from "./MealStats";
import { UserMealCard } from "./UserMealCard";
import { CalendarOff } from "lucide-react";
import { IMonth } from "@/types/month.types";
import { IHouse } from "@/types/house.types";
import { UserRole } from "@/lib/authUtils";

const MealView = ({
  meals = [],
  houses = [],
  months = [],
  selectedHouseId,
  selectedMonthId,
  currentUserRole,
  mealRate,
}: {
  meals?: any[];
  houses: IHouse[];
  months: IMonth[];
  selectedHouseId?: string;
  selectedMonthId?: string;
  currentUserRole?: UserRole;
  mealRate?: number;
}) => {
  const [selectedMeal, setSelectedMeal] = useState<any>(null);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Grouping meals by user instead of Date to support high density data easily
  const groupedMealsByUser = meals.reduce((acc: any, meal: any) => {
    if (!meal.userId) return acc;
    if (!acc[meal.userId]) {
      acc[meal.userId] = {
        user: meal.user || { name: "Unknown User", email: "" },
        meals: [],
      };
    }
    acc[meal.userId].meals.push(meal);
    return acc;
  }, {});

  const users = Object.values(groupedMealsByUser);

  const onEdit = (meal: any) => {
    setSelectedMeal(meal);
    setIsEditOpen(true);
  };

  const onDelete = (meal: any) => {
    setSelectedMeal(meal);
    setIsRemoveOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Modern Dashboard Header Block */}
      <div className="relative overflow-hidden flex flex-col items-start bg-card rounded-3xl border shadow-sm">
        {/* Background art */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full flex justify-between items-center p-6 sm:p-8 border-b bg-muted/20 z-10">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Meal Entries
            </h2>
            <p className="text-muted-foreground mt-1 text-sm font-medium">
              Log and track all daily house meals
            </p>
          </div>
          {currentUserRole !== "MEMBER" && (
            <AddMealModal
              houses={houses}
              months={months}
              defaultHouseId={selectedHouseId}
              defaultMonthId={selectedMonthId}
            />
          )}
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8 relative z-10">
          <MealFilters
            houses={houses}
            months={months}
            selectedHouseId={selectedHouseId}
            selectedMonthId={selectedMonthId}
          />
          <MealStats meals={meals} mealRate={mealRate} />
        </div>
      </div>

      {/* Grid view grouping Meals by User */}
      {meals.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-card rounded-3xl border border-dashed shadow-sm">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <CalendarOff className="w-8 h-8 text-muted-foreground/50" />
          </div>
          <h3 className="text-lg font-bold">No meals yet</h3>
          <p className="text-muted-foreground text-sm max-w-sm text-center mt-1">
            There are no meal logs for the selected month. Click &quot;Log
            Meal&quot; to add your first entry.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {users.map((userData: any, index: number) => (
            <UserMealCard
              key={index}
              user={userData.user}
              meals={userData.meals}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}

      {selectedMeal && (
        <UpdateMealModal
          open={isEditOpen}
          setOpen={setIsEditOpen}
          meal={selectedMeal}
        />
      )}

      {selectedMeal && (
        <RemoveMealDialog
          open={isRemoveOpen}
          setOpen={setIsRemoveOpen}
          mealId={selectedMeal.id || selectedMeal._id}
        />
      )}
    </div>
  );
};

export default MealView;
