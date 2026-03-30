"use server";

import { DepositServices } from "@/service/deposits.service";
import {
  ICreateDepositPayload,
  IUpdateDepositPayload,
} from "@/types/deposits.types";
import { updateTag } from "next/cache";

export const createDepositAction = async (payload: ICreateDepositPayload) => {
  const result = await DepositServices.createDeposit(payload);

  //revalidate
  updateTag("deposits");
  return result;
};

export const getDepositsByMonthAction = async (monthId: string) => {
  const result = await DepositServices.getDepositsByMonth(monthId);

  return result;
};

export const getDepositByIdAction = async (id: string) => {
  const result = await DepositServices.getDepositById(id);

  return result;
};

export const updateDepositByIdAction = async (
  id: string,
  payload: IUpdateDepositPayload,
) => {
  const result = await DepositServices.updateDepositById(id, payload);

  //revalidate
  updateTag("deposits");
  return result;
};

export const deleteDepositAction = async (id: string) => {
  const result = await DepositServices.deleteDeposit(id);

  //revalidate
  updateTag("deposits");
  return result;
};
