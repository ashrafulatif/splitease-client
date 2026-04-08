"use server";

import { MonthServices } from "@/service/month.service";
import { updateTag } from "next/cache";

export const createMonthAction = async (payload: any) => {
  const result = await MonthServices.createMonth(payload);

  //revalidate
  updateTag("months");
  return result;
};

export const getHouseMonthsAction = async (id: string, params?: {page?: number, limit?: number}) => {
  const result = await MonthServices.getHouseMonths(id, params);

  return result;
};

export const getFullMonthDataByIdAction = async (id: string) => {
  const result = await MonthServices.getFullMonthDataById(id);

  return result;
};

export const deleteMonthAction = async (id: string) => {
  const result = await MonthServices.deleteMonth(id);

  //revalidate
  updateTag("months");
  return result;
};
