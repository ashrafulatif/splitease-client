import { Check, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { IPayment, ISubscription } from "@/types/subscription.types";

interface SubscriptionCurrentCardProps {
  subscription: ISubscription | null;
  tier?: string;
  status?: string;
  features: string[];
  payments: IPayment[];
}

const SubscriptionCurrentCard = ({
  subscription,
  tier,
  status,
  features,
  payments,
}: SubscriptionCurrentCardProps) => {
  if (!subscription) {
    return (
      <Card className="p-8 border-dashed">
        <div className="text-center space-y-2">
          <Zap className="w-10 h-10 text-muted-foreground mx-auto" />
          <h3 className="text-lg font-semibold text-foreground">
            No Active Subscription
          </h3>
          <p className="text-muted-foreground text-sm">
            Choose a plan below to get started.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 md:p-8 bg-gradient-to-tr from-primary/10 to-secondary/10">
      <div className="space-y-2">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-1">
            {tier || "Free"} Plan
          </h2>
          <p className="text-muted-foreground text-sm">
            Subscription Status: {status}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Start Date</p>
            <p className="text-base font-semibold text-foreground">
              {subscription.startDate
                ? new Date(subscription.startDate).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Expiration Date</p>
            <p className="text-base font-semibold text-foreground">
              {subscription.endDate
                ? new Date(subscription.endDate).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Plan Name</p>
            <p className="text-base font-semibold text-foreground">
              {subscription.plan?.name || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Plan Price</p>
            <p className="text-base font-semibold text-foreground">
              ${subscription.plan?.price ?? "0.00"}
            </p>
          </div>
        </div>

        {features.length > 0 && (
          <div>
            <h3 className="font-semibold text-foreground mb-3">Plan Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600 shrink-0" />
                  <span className="text-foreground text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {payments.length > 0 && (
          <div>
            <h3 className="font-semibold text-foreground mb-3">Recent Payments</h3>
            <div className="space-y-2">
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex justify-between items-center p-3 bg-muted/30 rounded-lg border"
                >
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </p>
                    <p className="font-medium text-foreground">${payment.amount}</p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      payment.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {payment.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default SubscriptionCurrentCard;
