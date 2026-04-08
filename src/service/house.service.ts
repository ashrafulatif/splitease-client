import { API_ENDPOINTS, buildApiUrl } from "@/apiInstance";
import { ICreateHouse } from "@/types/house.types";
import { cookies } from "next/headers";

const createHouse = async (payload: ICreateHouse) => {
  try {
    const cookieStorage = await cookies();

    const url = new URL(buildApiUrl(API_ENDPOINTS.house.createHouse));

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

const getAllHouses = async (params?: {page?: number, limit?: number}) => {
  try {
    const cookieStorage = await cookies();

    const url = new URL(buildApiUrl(API_ENDPOINTS.house.getAllHouses));

    if(params?.page){
      url.searchParams.set("page", params.page.toString());
    }
    if(params?.limit){
      url.searchParams.set("limit", params.limit.toString());
    }

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Cookie: cookieStorage.toString(),
      },
      next: { tags: ["houses"] },
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
      meta: data.meta,
    };
  } catch {
    return {
      data: null,
      error: "Something went wrong",
    };
  }
};

const getMyHouse = async () => {
  try {
    const cookieStorage = await cookies();

    const url = new URL(buildApiUrl(API_ENDPOINTS.house.getMyHouse));

    const res = await fetch(url, {
      method: "GET",
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

const getHouseById = async (id: string) => {
  try {
    const cookieStorage = await cookies();

    const url = new URL(buildApiUrl(API_ENDPOINTS.house.getHouseById(id)));

    const res = await fetch(url, {
      method: "GET",
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

const updateHouseById = async (id: string, payload: ICreateHouse) => {
  try {
    const cookieStorage = await cookies();

    const url = new URL(buildApiUrl(API_ENDPOINTS.house.updateHouseById(id)));

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

const deleteHouse = async (id: string) => {
  try {
    const cookieStorage = await cookies();

    const url = new URL(buildApiUrl(API_ENDPOINTS.house.deleteHouse(id)));

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

export const HouseServices = {
  createHouse,
  getAllHouses,
  getMyHouse,
  getHouseById,
  updateHouseById,
  deleteHouse,
};
