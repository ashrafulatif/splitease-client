import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    label: string;
    isUp?: boolean;
  };
  className?: string;
  iconClassName?: string;
}

export const StatsCard = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  className,
  iconClassName,
}: StatsCardProps) => {
  return (
    <Card className={cn("overflow-hidden border-none shadow-sm bg-card/40 backdrop-blur-md hover:bg-card/50 transition-colors duration-300", className)}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between space-y-0">
          <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-70 tracking-widest whitespace-nowrap">
            {title}
          </p>
          <div className={cn("p-1.5 rounded-lg bg-primary/10", iconClassName)}>
            <Icon className="h-4 w-4 text-primary" />
          </div>
        </div>
        <div className="mt-1">
          <h3 className="text-xl font-black tracking-tight flex items-baseline gap-1">
            {typeof value === "number" ? value.toLocaleString() : value}
          </h3>
          {description && (
            <p className="text-[10px] text-muted-foreground font-semibold mt-0.5 opacity-60">
              {description}
            </p>
          )}
          {trend && (
            <div className="flex items-center gap-1.5 mt-2">
              <span
                className={cn(
                  "text-[9px] font-black px-1.5 py-0.5 rounded",
                  trend.isUp
                    ? "bg-emerald-500/10 text-emerald-600"
                    : "bg-destructive/10 text-destructive"
                )}
              >
                {trend.isUp ? "+" : "-"}{trend.value}%
              </span>
              <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-tight opacity-40">
                {trend.label}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>

  );
};
