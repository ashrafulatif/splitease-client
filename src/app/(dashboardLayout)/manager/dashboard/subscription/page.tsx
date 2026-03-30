import { Metadata } from "next";
import ManagerSubscriptionView from "@/components/module/Manager/SubscriptionComponet/ManagerSubscriptionView";
import { getMySubscriptionAction, getAllPlansAction } from "./_action";

const SubscriptionPage = async () => {
  const [plansRes, subscriptionRes] = await Promise.all([
    getAllPlansAction(),
    getMySubscriptionAction(),
  ]);

  const plans = plansRes?.data || [];

  const currentSubscription = subscriptionRes?.data || null;

  return (
    <div className="p-4 md:p-6 md:max-w-6xl mx-auto w-full">
      <ManagerSubscriptionView
        plans={plans}
        currentSubscription={currentSubscription}
      />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Subscriptions",
  description: "Manage your subscription and upgrade plans",
};

export default SubscriptionPage;
