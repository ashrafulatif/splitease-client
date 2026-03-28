/* eslint-disable @typescript-eslint/no-unused-vars */
import { API_ENDPOINTS, buildApiUrl } from "@/apiInstance";
import { ILoginData, IRegisterData } from "@/types/auth.types";

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

export const AuthServices = {
  registerUser,
  loginUser,
  verifyEmail,
  resendOtp,
};
