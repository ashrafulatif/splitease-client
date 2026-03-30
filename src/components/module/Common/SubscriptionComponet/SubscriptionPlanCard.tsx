import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IPlan } from "@/types/plan.types";

interface SubscriptionPlanCardProps {
  plan: IPlan;
  isProcessing: boolean;
  isDisabled: boolean;
  onSubscribe: (planId: string) => void;
}

const SubscriptionPlanCard = ({
  plan,
  isProcessing,
  isDisabled,
  onSubscribe,
}: SubscriptionPlanCardProps) => {
  return (
    <Card className="p-6 hover:shadow-sm transition-shadow h-full">
      <div className="space-y-4 h-full flex flex-col">
        <div>
          <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
          <p className="text-sm text-muted-foreground">
            {plan.durationDays} days
          </p>
        </div>

        <div className="text-3xl font-semibold text-foreground">
          ${plan.price}
        </div>

        {plan.features.length > 0 && (
          <div className="space-y-2">
            {plan.features.map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-green-600 shrink-0" />
                <span className="text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-auto pt-2">
          <Button
            onClick={() => onSubscribe(plan.id)}
            disabled={isDisabled}
            className="w-full py-4"
          >
            {isProcessing ? "Processing..." : "Subscribe Now"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SubscriptionPlanCard;
