"use server";

import { UserServices } from "@/service/user.service";
import {  updateTag } from "next/cache";

export const updateUserStatusAction = async (id: string, status: "ACTIVE" | "BLOCKED") => {
  try {
    const res = await UserServices.updateUserStatus(id, status);

    if (res?.error) {
      return {
        success: false,
        message: res.error,
      };
    }

    updateTag("users");

    return {
      success: true,
      message: res?.message || "User status updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "An unexpected error occurred while updating user status",
    };
  }
};

export const deleteUserAction = async (id: string) => {
  try {
    const res = await UserServices.deleteUser(id);

    if (res?.error) {
      return {
        success: false,
        message: res.error,
      };
    }

    updateTag("users");

    return {
      success: true,
      message: res?.message || "User deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "An unexpected error occurred while deleting user",
    };
  }
};
