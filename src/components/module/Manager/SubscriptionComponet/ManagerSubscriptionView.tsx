"use client";

import { useState } from "react";
import { toast } from "sonner";
import { IPlan } from "@/types/plan.types";
import { IPayment, ISubscription } from "@/types/subscription.types";
import { initiatePaymentAction } from "@/app/(dashboardLayout)/manager/dashboard/subscription/_action";
import SubscriptionCurrentCard from "@/components/module/Manager/SubscriptionComponet/SubscriptionCurrentCard";
import SubscriptionPlanCard from "@/components/module/Manager/SubscriptionComponet/SubscriptionPlanCard";

interface ManagerSubscriptionViewProps {
  plans: IPlan[];
  currentSubscription: {
    tier?: string;
    status?: string;
    features?: string[];
    subscription?: ISubscription | null;
    payments?: IPayment[];
  } | null;
}

const ManagerSubscriptionView = ({
  plans = [],
  currentSubscription = null,
}: ManagerSubscriptionViewProps) => {
  const [processingPlanId, setProcessingPlanId] = useState<string | null>(null);

  const subscription = currentSubscription?.subscription;
  const tier = currentSubscription?.tier;
  const features = currentSubscription?.features || [];
  const status = currentSubscription?.status;
  const payments = currentSubscription?.payments || [];

  const handleInitiatePayment = async (planId: string) => {
    setProcessingPlanId(planId);

    try {
      const result = await initiatePaymentAction(planId);

      if (result?.error || !result?.data?.paymentUrl) {
        toast.error(result?.error || "Failed to initiate payment");
        return;
      }

      toast.success(result?.message || "Redirecting to payment...");
      if (result.data.paymentUrl) {
        window.location.href = result.data.paymentUrl;
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setProcessingPlanId(null);
    }
  };

  return (
    <div className="w-full space-y-8">
      <SubscriptionCurrentCard
        subscription={subscription || null}
        tier={tier}
        status={status}
        features={features}
        payments={payments}
      />

      {/* Available Plans */}
      {plans && plans.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Available Plans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <SubscriptionPlanCard
                key={plan.id}
                plan={plan}
                isProcessing={processingPlanId === plan.id}
                isDisabled={Boolean(processingPlanId)}
                onSubscribe={handleInitiatePayment}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerSubscriptionView;
