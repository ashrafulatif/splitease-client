import { cn } from "@/lib/utils";
import { DecorIcon } from "@/components/ui/decor-icon";
import {
  ShieldCheck,
  UserCog,
  User,
  Check,
} from "lucide-react";

type Role = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  capabilities: string[];
  accent: string;
  iconBg: string;
};

const roles: Role[] = [
  {
    title: "Admin",
    subtitle: "Platform Control",
    icon: <ShieldCheck />,
    accent: "border-t-indigo-500",
    iconBg: "bg-indigo-500/10 text-indigo-500",
    capabilities: [
      "Manage all users across the platform",
      "Oversee all houses and their managers",
      "Control subscription plans and billing",
      "Access platform-wide analytics",
      "Assign and revoke roles as needed",
    ],
  },
  {
    title: "Manager",
    subtitle: "House Operations",
    icon: <UserCog />,
    accent: "border-t-primary",
    iconBg: "bg-primary/10 text-primary",
    capabilities: [
      "Create and configure monthly records",
      "Log shared expenses and manage deposits",
      "Add or remove house members",
      "Record and edit daily meal entries",
      "Review settlement summaries and balances",
    ],
  },
  {
    title: "Member",
    subtitle: "Transparent Visibility",
    icon: <User />,
    accent: "border-t-emerald-500",
    iconBg: "bg-emerald-500/10 text-emerald-500",
    capabilities: [
      "View personal meal history",
      "Track own deposit contributions",
      "See monthly expense breakdowns",
      "Monitor current meal rate",
      "Stay updated on house settlements",
    ],
  },
];

export function RolesSection() {
  return (
    <div className="mx-auto w-full max-w-5xl pt-24 pb-2 ">
      {/* Heading */}
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-balance font-medium text-2xl md:text-4xl lg:text-5xl">
          Built for Every Role{" "}
          <span className="inline-block text-primary animate-bounce italic">!</span>
        </h2>
        <div className="mx-auto mt-5 flex items-center justify-center gap-2">
          <span className="h-1 w-8 rounded-full bg-primary/35" />
          <span className="h-1.5 w-28 rounded-full bg-linear-to-r from-primary/70 via-primary to-primary/70 shadow-[0_0_18px] shadow-primary/30" />
          <span className="h-1 w-8 rounded-full bg-primary/35" />
        </div>
        <p className="mx-auto mt-5 max-w-2xl text-balance text-muted-foreground text-sm leading-relaxed md:text-base">
          SplitEase offers a tailored experience for each person in your house —
          whether you're running the platform, managing a household, or simply
          tracking your share.
        </p>
      </div>

      {/* Role Cards */}
      <div className="relative mt-12">
        <DecorIcon className="size-6 stroke-2 stroke-border" position="top-left" />
        <DecorIcon className="size-6 stroke-2 stroke-border" position="top-right" />
        <DecorIcon className="size-6 stroke-2 stroke-border" position="bottom-left" />
        <DecorIcon className="size-6 stroke-2 stroke-border" position="bottom-right" />

        <div className="grid grid-cols-1 md:grid-cols-3 border border-dashed divide-y md:divide-y-0 md:divide-x divide-dashed divide-border">
          {roles.map((role) => (
            <div key={role.title} className="relative flex flex-col gap-6 p-8">
              {/* Colored top accent bar */}
              <div className={cn("absolute top-0 left-8 right-8 h-[2px]", role.accent.replace("border-t-", "bg-"))} />

              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "p-2.5 rounded-lg [&_svg]:size-5",
                    role.iconBg
                  )}
                >
                  {role.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-base text-foreground">{role.title}</h3>
                  <p className="text-xs text-muted-foreground">{role.subtitle}</p>
                </div>
              </div>

              <ul className="space-y-2.5">
                {role.capabilities.map((cap) => (
                  <li key={cap} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <Check className="size-3.5 text-primary mt-0.5 shrink-0" />
                    {cap}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
