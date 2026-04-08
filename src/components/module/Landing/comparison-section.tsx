import { cn } from "@/lib/utils";
import { DecorIcon } from "@/components/ui/decor-icon";
import { Check, X } from "lucide-react";

export function ComparisonSection() {
  const oldWay = [
    "Endless WhatsApp messages arguing about bills",
    "Complicated Excel sheets to calculate meal rates",
    "Lost deposit receipts and payment disputes",
    "Manual errors in monthly settlements",
    "Zero transparency on where the money went",
  ];

  const newWay = [
    "One centralized dashboard for all members",
    "Automated meal rate and expense calculations",
    "Digital deposit logs that everyone can verify",
    "Error-free, 1-click monthly settlements",
    "100% transparency with role-based access",
  ];

  return (
    <div className="mx-auto w-full max-w-5xl pt-24 pb-10">
      <div className="mx-auto max-w-3xl text-center mb-12">
        <h2 className="text-balance font-medium text-2xl md:text-4xl lg:text-5xl">
          Say Goodbye to the Chaos{" "}
          <span className="inline-block text-primary animate-bounce italic">!</span>
        </h2>
        <div className="mx-auto mt-5 flex items-center justify-center gap-2">
          <span className="h-1 w-8 rounded-full bg-primary/35" />
          <span className="h-1.5 w-28 rounded-full bg-linear-to-r from-primary/70 via-primary to-primary/70 shadow-[0_0_18px] shadow-primary/30" />
          <span className="h-1 w-8 rounded-full bg-primary/35" />
        </div>
        <p className="mx-auto mt-5 max-w-2xl text-balance text-muted-foreground text-sm leading-relaxed md:text-base">
          Managing a shared house shouldn't feel like a second job. See why shared flats and hostels are making the switch.
        </p>
      </div>

      <div className="relative mt-8">
        <DecorIcon className="size-6 stroke-2 stroke-border" position="top-left" />
        <DecorIcon className="size-6 stroke-2 stroke-border" position="top-right" />
        <DecorIcon className="size-6 stroke-2 stroke-border" position="bottom-left" />
        <DecorIcon className="size-6 stroke-2 stroke-border" position="bottom-right" />

        <div className="grid grid-cols-1 md:grid-cols-2 border border-dashed divide-y md:divide-y-0 md:divide-x divide-dashed divide-border">
          {/* The Old Way */}
          <div className="relative flex flex-col gap-6 p-8 lg:p-10 bg-destructive/5">
            <div className="absolute top-0 left-8 right-8 h-[2px] bg-destructive/50" />
            
            <div>
              <h3 className="font-semibold text-xl text-foreground mb-1">The Old Way</h3>
              <p className="text-sm text-muted-foreground">Messy, stressful, and prone to arguments.</p>
            </div>

            <ul className="space-y-4 mt-2">
              {oldWay.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <div className="p-1 rounded-full bg-destructive/10 text-destructive shrink-0 mt-0.5">
                    <X className="size-3.5" />
                  </div>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* The SplitEase Way */}
          <div className="relative flex flex-col gap-6 p-8 lg:p-10 bg-primary/5">
            <div className="absolute top-0 left-8 right-8 h-[2px] bg-primary" />
            
            <div>
              <h3 className="font-semibold text-xl text-foreground mb-1">The SplitEase Way</h3>
              <p className="text-sm text-muted-foreground">Clean, transparent, and completely automated.</p>
            </div>

            <ul className="space-y-4 mt-2">
              {newWay.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground font-medium">
                  <div className="p-1 rounded-full bg-primary/20 text-primary shrink-0 mt-0.5">
                    <Check className="size-3.5" />
                  </div>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
