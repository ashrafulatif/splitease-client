import { cn } from "@/lib/utils";
import type React from "react";
import { DecorIcon } from "@/components/ui/decor-icon";
import { HomeIcon, UsersIcon, CalendarDaysIcon } from "lucide-react";

type FeatureType = {
  title: string;
  icon: React.ReactNode;
  description: string;
};

export function HowtoStartSection() {
  return (
    <div className="mx-auto max-w-5xl pt-30">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-balance font-medium text-2xl md:text-4xl lg:text-5xl">
          How SplitEase Works{" "}
          <span className="inline-block text-primary animate-bounce italic">!</span>
        </h2>
        <div className="mx-auto mt-5 flex items-center justify-center gap-2">
          <span className="h-1 w-8 rounded-full bg-primary/35" />
          <span className="h-1.5 w-28 rounded-full bg-linear-to-r from-primary/70 via-primary to-primary/70 shadow-[0_0_18px] shadow-primary/30" />
          <span className="h-1 w-8 rounded-full bg-primary/35" />
        </div>
        <p className="mt-4 text-balance text-muted-foreground text-sm md:text-sm">
          SplitEase helps managers and members track meals, deposits, expenses,
          and monthly settlements from one clean dashboard.
        </p>
      </div>

      <div className="relative mt-8">
        {/* Corner Icons */}
        <DecorIcon
          className="size-6 stroke-2 stroke-border"
          position="top-left"
        />
        <DecorIcon
          className="size-6 stroke-2 stroke-border"
          position="top-right"
        />
        <DecorIcon
          className="size-6 stroke-2 stroke-border"
          position="bottom-left"
        />
        <DecorIcon
          className="size-6 stroke-2 stroke-border"
          position="bottom-right"
        />

        <DashedLine className="-top-[1.5px] right-3 left-3" />
        <DashedLine className="top-3 -right-[1.5px] bottom-3" />
        <DashedLine className="top-3 bottom-3 -left-[1.5px]" />
        <DashedLine className="right-3 -bottom-[1.5px] left-3" />

        <div className="grid grid-cols-1 md:grid-cols-3">
          {features.map((feature) => (
            <div
              className="group [&_svg]:mask-b-from-0% relative p-8 [&_svg]:size-7 [&_svg]:text-primary"
              key={feature.title}
            >
              {feature.icon}
              <h3 className="font-medium text-lg">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
              <DashedLine className="right-5 bottom-0 left-5 group-last:hidden md:top-5 md:right-0 md:bottom-5 md:left-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DashedLine({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("absolute border-collapse border border-dashed", className)}
      {...props}
    />
  );
}

const features: FeatureType[] = [
  {
    title: "Create Your House",
    icon: <HomeIcon />,
    description:
      "Set up your shared house, choose the current month, and start managing all records in one place.",
  },
  {
    title: "Invite Members",
    icon: <UsersIcon />,
    description:
      "Add your house members so everyone can view updates, track activity, and stay aligned on shared costs.",
  },
  {
    title: "Track Monthly Activity",
    icon: <CalendarDaysIcon />,
    description:
      "Log meals, deposits, and expenses throughout the month, then review summaries before settlement.",
  },
];
