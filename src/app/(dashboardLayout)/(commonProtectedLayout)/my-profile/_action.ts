"use server";

import { AuthServices } from "@/service/auth.service";
import { IchagePasswordData } from "@/types/auth.types";
import { revalidatePath } from "next/cache";

export const changePasswordAction = async (payload: IchagePasswordData) => {
  try {
    const res = await AuthServices.changePassword(payload);

    if (res?.error) {
      return {
        success: false,
        message: res.error,
      };
    }

    return {
      success: true,
      message: res?.message || "Password changed successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};

export const updateProfileAction = async (payload: FormData) => {
  try {
    const res = await AuthServices.updateProfile(payload);

    if (res?.error) {
      return {
        success: false,
        message: res.error,
      };
    }

    revalidatePath("/my-profile");

    return {
      success: true,
      message: res?.message || "Profile updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};
