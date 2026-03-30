import { API_ENDPOINTS, buildApiUrl } from "@/apiInstance";
import { cookies } from "next/headers";

const getMonthlySummary = async (monthId: string) => {
  try {
    const cookieStore = await cookies();
    const url = new URL(buildApiUrl(API_ENDPOINTS.stats.getMonthlySummary(monthId)));

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache : "no-store"
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

const getDashboardSummary = async () => {
  try {
    const cookieStore = await cookies();
    const url = new URL(buildApiUrl(API_ENDPOINTS.stats.getDashboardSummary));

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store"
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

export const DashboardService = {
  getMonthlySummary,
  getDashboardSummary,
};
