import { API_ENDPOINTS, buildApiUrl } from "@/apiInstance";
import { ICreatePlan, IUpdatePlan } from "@/types/plan.types";
import { cookies } from "next/headers";

const createPlan = async (payload: ICreatePlan) => {
  try {
    const cookieStorage = await cookies();

    const url = new URL(buildApiUrl(API_ENDPOINTS.plans.createPlan));

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

const getAllPlans = async () => {
  try {
    const cookieStorage = await cookies();
    const url = new URL(buildApiUrl(API_ENDPOINTS.plans.getAllPlans));

    const res = await fetch(url, {
      method: "GET",
      next: { tags: ["plans"] },
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
      error: "Something went wrong",
    };
  }
};

const updatePlan = async (id: string, payload: IUpdatePlan) => {
  try {
    const cookieStorage = await cookies();

    const url = new URL(buildApiUrl(API_ENDPOINTS.plans.updatePlan(id)));

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

const deletePlan = async (id: string) => {
  try {
    const cookieStorage = await cookies();

    const url = new URL(buildApiUrl(API_ENDPOINTS.plans.deletePlan(id)));

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
      error: "Something went wrong",
    };
  }
};

const getPlanById = async (id: string) => {
  try {
     const cookieStorage = await cookies();
    const url = new URL(buildApiUrl(API_ENDPOINTS.plans.updatePlan(id))); 

    const res = await fetch(url, {
      method: "GET",
      next: { tags: ["plans"] },
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
      error: "Something went wrong",
    };
  }
};

export const PlanServices = {
  createPlan,
  getAllPlans,
  getPlanById,
  updatePlan,
  deletePlan,
};
