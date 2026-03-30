import { API_ENDPOINTS, buildApiUrl } from "@/apiInstance";
import { cookies } from "next/headers";

const getMySubscription = async () => {
  try {
    const cookieStorage = await cookies();
    const url = new URL(
      buildApiUrl(API_ENDPOINTS.subscriptions.getMySubscription),
    );

    const res = await fetch(url, {
      method: "GET",
      next: { tags: ["subscriptions"] },
      headers: {
        Cookie: cookieStorage.toString(),
      },
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

const getAllSubscriptions = async () => {
  try {
    const cookieStorage = await cookies();
    const url = new URL(
      buildApiUrl(API_ENDPOINTS.subscriptions.getAllSubscriptions),
    );

    const res = await fetch(url, {
      method: "GET",
      next: { tags: ["subscriptions"] },
      headers: {
        Cookie: cookieStorage.toString(),
      },
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

const initiatePayment = async (id: string) => {
  try {
    const cookieStorage = await cookies();
    const url = new URL(
      buildApiUrl(API_ENDPOINTS.subscriptions.initiatePayment(id)),
    );

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Cookie: cookieStorage.toString(),
      },
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

export const SubscriptionServices = {
  getMySubscription,
  getAllSubscriptions,
  initiatePayment,
};
