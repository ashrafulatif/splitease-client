import { API_ENDPOINTS, buildApiUrl } from "@/apiInstance";
import { ICreateMonth } from "@/types/month.types";
import { cookies } from "next/headers";



const createMonth = async (payload: ICreateMonth) => {
  try {
    const cookieStorage = await cookies();

    const url = new URL(buildApiUrl(API_ENDPOINTS.months.createMonth));

    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStorage.toString(),
      },
      body: JSON.stringify(payload),
    });

    const data = await result.json();

    if (!data.success) {
      return {
        message: data.message,
      };
    }
    return {
      message: data.message,
      data: data.data,
    };
  } catch {
    return {
      data: null,
      error: "Something went wrong",
    };
  }
};

const getHouseMonths = async (id: string) => {
  try {
    const cookieStorage = await cookies();

    const url = new URL(buildApiUrl(API_ENDPOINTS.months.getHouseMonths(id)));

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Cookie: cookieStorage.toString(),
      },
      next: { tags: ["months"] },
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
  } catch {
    return {
      data: null,
      error: "Something went wrong",
    };
  }
};

const getFullMonthDataById = async (id: string) => {
  try {
    const cookieStorage = await cookies();

    const url = new URL(buildApiUrl(API_ENDPOINTS.months.getFullMonthDataById(id)));

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Cookie: cookieStorage.toString(),
      },
      next: { tags: ["months", "month-details"] },
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
  } catch {
    return {
      data: null,
      error: "Something went wrong",
    };
  }
};

const deleteMonth = async (id: string) => {
  try {
    const cookieStorage = await cookies();

    const url = new URL(buildApiUrl(API_ENDPOINTS.months.deleteMonth(id)));

    const result = await fetch(url, {
      method: "DELETE",
      headers: {
        Cookie: cookieStorage.toString(),
      },
    });

    const data = await result.json();

    if (!data.success) {
      return {
        message: data.message,
      };
    }
    return {
      message: data.message,
      data: data.data,
    };
  } catch {
    return {
      data: null,
      error: "Something went wrong",
    };
  }
};

export const MonthServices = {
  createMonth,
  getHouseMonths,
  getFullMonthDataById,
  deleteMonth,
};
