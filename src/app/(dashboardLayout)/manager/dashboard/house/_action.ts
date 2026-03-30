"use server";

import { HouseServices } from "@/service/house.service";
import { ICreateHouse } from "@/types/house.types";
import { updateTag } from "next/cache";

export const createHouseAction = async (payload: ICreateHouse) => {
  const result = await HouseServices.createHouse(payload);

  //revalidate
  updateTag("houses");
  return result;
};

export const getAllHousesAction = async () => {
  const result = await HouseServices.getAllHouses();

  return result;
};

export const getMyHouseAction = async () => {
  const result = await HouseServices.getMyHouse();

  return result;
};

export const getHouseByIdAction = async (id: string) => {
  const result = await HouseServices.getHouseById(id);

  return result;
};

export const updateHouseByIdAction = async (
  id: string,
  payload: ICreateHouse,
) => {
  const result = await HouseServices.updateHouseById(id, payload);
  updateTag("houses");
  return result;
};

export const deleteHouseAction = async (id: string) => {
  const result = await HouseServices.deleteHouse(id);
  updateTag("houses");
  return result;
};
