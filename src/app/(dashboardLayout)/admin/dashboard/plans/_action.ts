"use server";

import { PlanServices } from "@/service/plans.service";
import { ICreatePlan, IUpdatePlan } from "@/types/plan.types";
import {  updateTag } from "next/cache";

export const createPlanAction = async (payload: ICreatePlan) => {
  try {
    const res = await PlanServices.createPlan(payload);

    if (res?.error) {
      return {
        success: false,
        message: res.error,
      };
    }

    updateTag("plans");

    return {
      success: true,
      message: res?.message || "Plan created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};

export const updatePlanAction = async (id: string, payload: IUpdatePlan) => {
  try {
    const res = await PlanServices.updatePlan(id, payload);

    if (res?.error) {
      return {
        success: false,
        message: res.error,
      };
    }

    updateTag("plans");

    return {
      success: true,
      message: res?.message || "Plan updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};

export const deletePlanAction = async (id: string) => {
  try {
    const res = await PlanServices.deletePlan(id);

    if (res?.error) {
      return {
        success: false,
        message: res.error,
      };
    }

    updateTag("plans");

    return {
      success: true,
      message: res?.message || "Plan deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};
