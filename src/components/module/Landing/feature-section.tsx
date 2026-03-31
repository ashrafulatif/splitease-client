import { cn } from "@/lib/utils";
import type React from "react";
import { GridPattern } from "@/components/ui/grid-pattern";
import {
  CalendarDays,
  ChartColumn,
  CreditCard,
  ShieldCheck,
  Utensils,
  Wallet,
} from "lucide-react";

type FeatureType = {
  title: string;
  icon: React.ReactNode;
  description: string;
};

export function FeatureSection() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 pt-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-balance font-medium text-2xl md:text-4xl lg:text-5xl">
          Everything Your Shared Home Needs{" "}
          <span className="inline-block text-primary animate-bounce italic">
            !
          </span>
        </h2>
        <div className="mx-auto mt-5 flex items-center justify-center gap-2">
          <span className="h-1 w-8 rounded-full bg-primary/35" />
          <span className="h-1.5 w-28 rounded-full bg-linear-to-r from-primary/70 via-primary to-primary/70 shadow-[0_0_18px] shadow-primary/30" />
          <span className="h-1 w-8 rounded-full bg-primary/35" />
        </div>
        <p className="mx-auto mt-5 max-w-2xl text-balance text-muted-foreground text-sm leading-relaxed md:text-base">
          SplitEase helps managers and members track meals, deposits, expenses,
          and monthly settlements from one clean dashboard.
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 md:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard feature={feature} key={feature.title} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function FeatureCard({
  feature,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  feature: FeatureType;
}) {
  return (
    <div
      className={cn("relative overflow-hidden bg-background p-6", className)}
      {...props}
    >
      <div className="mask-[radial-gradient(farthest-side_at_top,white,transparent)] pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 size-full">
        <GridPattern
          className="absolute inset-0 size-full stroke-foreground/20"
          height={40}
          width={40}
          x={20}
        />
      </div>
      <div className="[&_svg]:size-6 [&_svg]:text-primary">{feature.icon}</div>
      <h3 className="mt-10 text-sm md:text-base">{feature.title}</h3>
      <p className="relative z-20 mt-2 font-light text-muted-foreground text-xs">
        {feature.description}
      </p>
    </div>
  );
}

const features: FeatureType[] = [
  {
    title: "Month-Based Tracking",
    icon: <CalendarDays />,
    description:
      "Organize every meal, deposit, and expense by house and month for easy review and settlement.",
  },
  {
    title: "Meal Management",
    icon: <Utensils />,
    description:
      "Log breakfast, lunch, and dinner entries and monitor meal rates with clear monthly summaries.",
  },
  {
    title: "Expense & Deposit Logs",
    icon: <Wallet />,
    description:
      "Record rent, utilities, and deposits in one place so everyone can see transparent financial activity.",
  },
  {
    title: "Role-Based Access",
    icon: <ShieldCheck />,
    description:
      "Managers can create and edit records while members get a focused, read-only experience.",
  },
  {
    title: "Subscription & Payments",
    icon: <CreditCard />,
    description:
      "Upgrade plans and initiate secure checkout flows to unlock advanced management features.",
  },
  {
    title: "Smart Monthly Insights",
    icon: <ChartColumn />,
    description:
      "View totals, category breakdowns, and key stats that help your house plan better each month.",
  },
];
