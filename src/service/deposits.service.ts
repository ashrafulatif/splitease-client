import { API_ENDPOINTS, buildApiUrl } from "@/apiInstance";
import { cookies } from "next/headers";
import { ICreateDepositPayload, IUpdateDepositPayload } from "@/types/deposits.types";

const createDeposit = async (payload: ICreateDepositPayload) => {
  try {

    const cookieStorage = await cookies();

    const url = new URL(buildApiUrl(API_ENDPOINTS.deposits.createDeposit));

    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStorage.toString(),
      },
      body: JSON.stringify(payload),
    });

    const data = await result.json()
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

const getDepositsByMonth = async (monthId: string) => {
  try {
    const cookieStorage = await cookies();

    const baseUrl = buildApiUrl(API_ENDPOINTS.deposits.getDepositsByMonth);
    const url = new URL(baseUrl);
    url.searchParams.append("monthId", monthId);

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Cookie: cookieStorage.toString(),
      },
      next: { tags: ["deposits"] },
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

const getDepositById = async (id: string) => {
  try {
    const cookieStorage = await cookies();

    const url = new URL(buildApiUrl(API_ENDPOINTS.deposits.getDepositById(id)));

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Cookie: cookieStorage.toString(),
      },
      next: { tags: ["deposits", "deposit-details"] },
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

const updateDepositById = async (id: string, payload: IUpdateDepositPayload) => {
  try {
    const cookieStorage = await cookies();

    const url = new URL(buildApiUrl(API_ENDPOINTS.deposits.updateDepositById(id)));

    const result = await fetch(url, {
      method: "PATCH",
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

const deleteDeposit = async (id: string) => {
  try {
    const cookieStorage = await cookies();

    const url = new URL(buildApiUrl(API_ENDPOINTS.deposits.deleteDeposit(id)));

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

export const DepositServices = {
  createDeposit,
  getDepositsByMonth,
  getDepositById,
  updateDepositById,
  deleteDeposit,
};
