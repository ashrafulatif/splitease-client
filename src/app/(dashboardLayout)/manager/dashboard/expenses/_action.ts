"use server";

import { ExpenseServices } from "@/service/manager-service/expenses.service";
import { ICreateExpense, IUpdateExpense } from "@/types/expense.types";
import { updateTag } from "next/cache";

export const createExpenseAction = async (payload: ICreateExpense) => {
  const result = await ExpenseServices.createExpense(payload);

  //revalidate
  updateTag("expenses");
  return result;
};

export const getExpensesByMonthAction = async (monthId: string) => {
  const result = await ExpenseServices.getExpensesByMonth(monthId);

  return result;
};

export const getExpenseByIdAction = async (id: string) => {
  const result = await ExpenseServices.getExpenseById(id);

  return result;
};

export const updateExpenseByIdAction = async (
  id: string,
  payload: IUpdateExpense,
) => {
  const result = await ExpenseServices.updateExpenseById(id, payload);

  //revalidate
  updateTag("expenses");
  return result;
};

export const deleteExpenseAction = async (id: string) => {
  const result = await ExpenseServices.deleteExpense(id);

  //revalidate
  updateTag("expenses");
  return result;
};

