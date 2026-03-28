import { env } from "./env";

//base api
export const API_BASE_URL = env.BACKEND_URL;

//api endpoints
export const API_ENDPOINTS = {
  auth: {
    login: "/api/v1/auth/login",
    register: "/api/v1/auth/register",
    logout: "/api/v1/auth/logout",
    verifyEmail: "/api/v1/auth/verify-email",
    resendOtp: "/api/v1/auth/resend-otp",
    me: "/api/v1/auth/me",
  },
} as const;

export const buildApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint}`;
};
