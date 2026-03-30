"use server";

import { SubscriptionServices } from "@/service/subscription.service";

export const getAllSubscriptions = async () => {
  const { data: subscriptions = [] } =
    await SubscriptionServices.getAllSubscriptions();
  return subscriptions;
};
