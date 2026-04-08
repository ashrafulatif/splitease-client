import { API_ENDPOINTS, buildApiUrl } from "@/apiInstance";
import { cookies } from "next/headers";

const getAllUsers = async (params? :{page? : number, limit? : number}) => {
  try {
    const cookieStorage = await cookies();
    const url = new URL(buildApiUrl(API_ENDPOINTS.users.getAllUsers));

    if(params?.page){
      url.searchParams.set("page", params.page.toString());
    }
    if(params?.limit){
      url.searchParams.set("limit", params.limit.toString());
    }

    const res = await fetch(url, {
      method: "GET",
      next: { tags: ["users"] },
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
      meta: data.meta,
    };
  } catch (error) {
    return {
      data: null,
      error: "Something went wrong while fetching users",
    };
  }
};

const updateUserStatus = async (id: string, status: "ACTIVE" | "INACTIVE" | "SUSPENDED") => {
  try {
    const cookieStorage = await cookies();
    const url = new URL(buildApiUrl(API_ENDPOINTS.users.updateUserStatus(id)));

    const result = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStorage.toString(),
      },
      body: JSON.stringify({ status }),
    });

    const data = await result.json();

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
      error: "Something went wrong while updating user status",
    };
  }
};

const deleteUser = async (id: string) => {
  try {
    const cookieStorage = await cookies();
    const url = new URL(buildApiUrl(API_ENDPOINTS.users.deleteUser(id)));

    const result = await fetch(url, {
      method: "DELETE",
      headers: {
        Cookie: cookieStorage.toString(),
      },
    });

    const data = await result.json();

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
      error: "Something went wrong while deleting user",
    };
  }
};

const getUserById = async (id: string) => {
  try {
    const cookieStorage = await cookies();
    const url = new URL(buildApiUrl(API_ENDPOINTS.users.getUserById(id)));

    const res = await fetch(url, {
      method: "GET",
      next: { tags: ["users"] },
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
  } catch (error) {
    return {
      data: null,
      error: "Something went wrong while fetching user details",
    };
  }
};

export const UserServices = {
  getAllUsers,
  updateUserStatus,
  deleteUser,
  getUserById,
};
