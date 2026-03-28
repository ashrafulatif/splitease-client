"use server";

import { AuthServices } from "@/service/auth.services";
import { IRegisterData } from "@/types/auth.types";

export const registerUserAction = async (payload: IRegisterData) => {
  const result = await AuthServices.registerUser(payload);

  return result;
};
