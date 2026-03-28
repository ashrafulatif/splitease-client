"use server";

import { AuthServices } from "@/service/auth.services";

export const verifyEmailAction = async (otp: string, email: string) => {
  const result = await AuthServices.verifyEmail(otp, email);

  return result;
};

export const resendOtpAction = async (email: string) => {
  const result = await AuthServices.resendOtp(email);

  return result;
};
