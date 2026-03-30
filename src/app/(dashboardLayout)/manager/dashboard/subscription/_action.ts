"use server";

import { SubscriptionServices } from "@/service/subscription.service";
import { PlanServices } from "@/service/plans.service";

export const getMySubscriptionAction = async () => {
  const result = await SubscriptionServices.getMySubscription();
  return result;
};

export const getAllPlansAction = async () => {
  const result = await PlanServices.getAllPlans();
  return result;
};

export const initiatePaymentAction = async (planId: string) => {
  const result = await SubscriptionServices.initiatePayment(planId);
  return result;
};
