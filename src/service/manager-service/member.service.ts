import { API_ENDPOINTS, buildApiUrl } from "@/apiInstance";
import { IAddMember } from "@/types/house.types";
import { cookies } from "next/headers";

const addMember = async (payload: IAddMember) => {
  try {
    const cookieStorage = await cookies();

    const url = new URL(buildApiUrl(API_ENDPOINTS.members.addMember));

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

const getAllMembers = async () => {
  try {
    const cookieStorage = await cookies();

    const url = new URL(buildApiUrl(API_ENDPOINTS.members.getAllMembers));

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Cookie: cookieStorage.toString(),
      },
      next: { tags: ["house-members"] },
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

const getHouseMembers = async (id: string) => {
  try {
    const cookieStorage = await cookies();

    const url = new URL(buildApiUrl(API_ENDPOINTS.members.getHouseMembers(id)));

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Cookie: cookieStorage.toString(),
      },
      next: { tags: ["house-members"] },
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

const getMemberById = async (id: string) => {
  try {
    const cookieStorage = await cookies();

    const url = new URL(buildApiUrl(API_ENDPOINTS.members.getMemberById(id)));

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Cookie: cookieStorage.toString(),
      },
      next: { tags: ["house-members"] },
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

const removeMember = async (id: string) => {
  try {
    const cookieStorage = await cookies();

    const url = new URL(buildApiUrl(API_ENDPOINTS.members.removeMember(id)));

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


export const MemberService = {
    addMember,
    getAllMembers,
    getHouseMembers,
    getMemberById,
    removeMember
}