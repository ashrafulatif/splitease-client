/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { API_ENDPOINTS, buildApiUrl } from "@/apiInstance";
import {
  IchagePasswordData,
  ILoginData,
  IRegisterData,
  IUpdateProfileData,
} from "@/types/auth.types";
import { cookies } from "next/headers";

const registerUser = async (registerData: IRegisterData) => {
  try {
    //get the url
    const url = new URL(buildApiUrl(API_ENDPOINTS.auth.register));

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    });

    const data = await res.json();

    if (!data.success) {
      return {
        error: data.message,
        data: null,
      };
    }

    return {
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    return {
      data: null,
      error: "Something went wrong",
    };
  }
};

const loginUser = async (loginData: ILoginData) => {
  try {
    const url = new URL(buildApiUrl(API_ENDPOINTS.auth.login));

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const data = await res.json();

    if (!data.success) {
      return {
        error: data.message,
        data: null,
      };
    }

    return {
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    return {
      data: null,
      error: "Something went wrong",
    };
  }
};

const verifyEmail = async (otp: string, email: string) => {
  try {
    const url = new URL(buildApiUrl(API_ENDPOINTS.auth.verifyEmail));

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp, email }),
    });

    const data = await res.json();

    if (!data.success) {
      return {
        error: data.message,
        data: null,
      };
    }

    return {
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    return {
      data: null,
      error: "Something went wrong",
    };
  }
};

const resendOtp = async (email: string) => {
  try {
    const url = new URL(buildApiUrl(API_ENDPOINTS.auth.resendOtp));

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!data.success) {
      return {
        error: data.message,
        data: null,
      };
    }

    return {
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    return {
      data: null,
      error: "Something went wrong",
    };
  }
};

export const getUserInfoFromTokens = async (
  accessToken?: string,
  betterAuthToken?: string,
  options?: { noStore?: boolean },
) => {
  try {
    if (!accessToken) {
      return null;
    }

    const url = new URL(buildApiUrl(API_ENDPOINTS.auth.me));
    const cookieHeader = betterAuthToken
      ? `accessToken=${accessToken}; better-auth.session_token=${betterAuthToken}`
      : `accessToken=${accessToken}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      ...(options?.noStore ? { cache: "no-store" as const } : {}),
    });

    if (!res.ok) {
      console.error("Failed to fetch user info:", res.status, res.statusText);
      return null;
    }

    const { data } = await res.json();
    return data;
  } catch (error: any) {
    console.error("Error fetching user info:", error);
    return null;
  }
};

export async function getUserInfo() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const betterAuthToken = cookieStore.get("better-auth.session_token")?.value;

    return getUserInfoFromTokens(accessToken, betterAuthToken);
  } catch {
    return null;
  }
}

const changePassword = async (payload: IchagePasswordData) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const betterAuthToken = cookieStore.get("better-auth.session_token")?.value;

    if (!accessToken) {
      return null;
    }
    const url = new URL(buildApiUrl(API_ENDPOINTS.auth.changePassword));

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}; better-auth.session_token=${betterAuthToken}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!data.success) {
      return {
        error: data.message,
        data: null,
      };
    }

    return {
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    return {
      data: null,
      error: "Something went wrong",
    };
  }
};

const updateProfile = async (payload: FormData) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const betterAuthToken = cookieStore.get("better-auth.session_token")?.value;

    if (!accessToken) {
      return null;
    }
    const url = new URL(buildApiUrl(API_ENDPOINTS.auth.updateProfile));

    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        Cookie: `accessToken=${accessToken}; better-auth.session_token=${betterAuthToken}`,
      },
      body: payload,
    });

    const data = await res.json();

    if (!data.success) {
      return {
        error: data.message,
        data: null,
      };
    }

    return {
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    return {
      data: null,
      error: "Something went wrong",
    };
  }
};

const logoutUser = async () => {
  try {
    const url = new URL(buildApiUrl(API_ENDPOINTS.auth.logout));
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const betterAuthToken = cookieStore.get("better-auth.session_token")?.value;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}; better-auth.session_token=${betterAuthToken}`,
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const AuthServices = {
  registerUser,
  loginUser,
  verifyEmail,
  resendOtp,
  getUserInfoFromTokens,
  getUserInfo,
  changePassword,
  updateProfile,
  logoutUser,
};
