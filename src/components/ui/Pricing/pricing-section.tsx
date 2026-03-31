import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import Link from "next/link";

type PricingPlan = {
  name: string;
  price: string;
  period?: string;
  description: string;
  href?: string;
  featuresTitle: string;
  features: string[];
  isPopular?: boolean;
};

const pricingPlans: PricingPlan[] = [
  {
    name: "BASIC",
    price: "Free",
    description: "For small shared houses getting started",
    featuresTitle: "INCLUDED IN BASIC:",
    features: [
      "Manage 1 house",
      "Track monthly meals",
      "Record deposits and expenses",
      "Member read-only access",
    ],
    href: "/manager/dashboard/subscription",
  },
  {
    name: "PRO",
    isPopular: true,
    href: "/manager/dashboard/subscription",
    price: "৳299",
    period: "month",
    description: "For managers handling multiple houses",
    featuresTitle: "EVERYTHING IN BASIC, PLUS:",
    features: [
      "Manage multiple houses",
      "Advanced monthly insights",
      "Subscription and payment history",
      "Priority support",
      "Faster settlement workflow",
    ],
  },
];

export function PricingSection() {
  return (
    <section className="mx-auto min-h-screen max-w-5xl place-content-center border-x py-4 pb-10">
      <div className="relative">
        <FullWidthDivider position="top" />
        <FullWidthDivider position="bottom" />

        <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col bg-background p-8 md:col-span-2">
            <p className="mb-6 text-muted-foreground text-sm uppercase tracking-wider">
              PRICING
            </p>
            <h1 className="font-bold text-3xl leading-tight md:text-5xl">
              Simple Pricing for Shared Living
            </h1>
          </div>

          {pricingPlans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <div className="flex flex-col bg-background *:px-4 *:py-6">
      <div className="border-b">
        <p className="mb-6 text-muted-foreground text-sm uppercase tracking-wider">
          {plan.name}
        </p>
        <div className="mb-2 flex items-baseline gap-2">
          <h2 className="font-bold text-4xl">{plan.price}</h2>
          {plan.period && (
            <span className="text-muted-foreground text-xs">
              / {plan.period}
            </span>
          )}
        </div>
        <p className="mb-8 line-clamp-1 text-muted-foreground">
          {plan.description}
        </p>

        <Button
          asChild
          className="w-full"
          variant={plan.isPopular ? "default" : "outline"}
        >
          <Link href={plan.href || "/manager/dashboard/subscription"}>
            Get started
          </Link>
        </Button>
      </div>

      <div className="space-y-3 text-muted-foreground text-sm">
        <p className="mb-6 text-xs uppercase">{plan.featuresTitle}</p>

        {plan.features.map((feature) => (
          <p
            className="flex items-center gap-2 text-foreground/80"
            key={feature}
          >
            <CheckIcon className="size-4" />
            {feature}
          </p>
        ))}
      </div>
    </div>
  );
}
