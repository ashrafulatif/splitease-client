"use server";

import { HouseServices } from "@/service/manager-service/house.service";
import { ICreateHouse } from "@/types/house.types";
import {  updateTag } from "next/cache";

export const updateHouseAction = async (id: string, payload: ICreateHouse) => {
  try {
    const result = await HouseServices.updateHouseById(id, payload);

    if (result.error) {
      return {
        success: false,
        message: result.error,
      };
    }

    updateTag("houses");

    return {
      success: true,
      message: result.message || "House updated successfully",
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong while updating the house",
    };
  }
};

export const deleteHouseAction = async (id: string) => {
  try {
    const result = await HouseServices.deleteHouse(id);

    if (result.error) {
      return {
        success: false,
        message: result.error,
      };
    }

    updateTag("houses");

    return {
      success: true,
      message: result.message || "House deleted successfully",
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong while deleting the house",
    };
  }
};
