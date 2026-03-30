"use server";

import { deleteCookie } from "@/lib/cookieUtils";
import { AuthServices } from "@/service/auth.service";


export const logoutUserAction = async () => {
  try {
    //clear server side session
    await AuthServices.logoutUser();

    // Clear cookies
    await deleteCookie("accessToken");
    await deleteCookie("refreshToken");
    await deleteCookie("better-auth.session_token");

  } catch (error) {
    console.error("Logout error:", error);
  }
};
