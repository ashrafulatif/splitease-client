"use server";

import { MealServices } from "@/service/manager-service/meal.service";
import { IMeal, IUpdateMeal } from "@/types/meal.types";
import { updateTag } from "next/cache";

export const addMealAction = async (payload: IMeal) => {
  const result = await MealServices.addMeal(payload);

  //revalidate
  updateTag("meals");
  return result;
};

export const getMealsByMonthAction = async (id: string) => {
  const result = await MealServices.getMealsByMonth(id);

  return result;
};

export const getMealByIdAction = async (id: string) => {
  const result = await MealServices.getMealById(id);

  return result;
};

export const updateMealByIdAction = async (
  id: string,
  payload: IUpdateMeal,
) => {
  const result = await MealServices.updateMealById(id, payload);
  updateTag("meals");
  return result;
};

export const deleteMealAction = async (id: string) => {
  const result = await MealServices.deleteMeal(id);
  
  //revalidate
  updateTag("meals");
  return result;
};
