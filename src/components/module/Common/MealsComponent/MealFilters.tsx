"use client";

import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { IHouse } from "@/types/house.types";
import { IMonth } from "@/types/month.types";

export const MealFilters = ({
  houses = [],
  months = [],
  selectedHouseId,
  selectedMonthId,
}: {
  houses: IHouse[];
  months: IMonth[];
  selectedHouseId?: string;
  selectedMonthId?: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleHouseChange = (newHouseId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("house", newHouseId);
    params.delete("month");
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleMonthChange = (newMonthId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("month", newMonthId);
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          FILTERS
        </span>
        {isPending && <Loader2 className="w-3 h-3 animate-spin text-primary" />}
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Select
          value={selectedHouseId || ""}
          onValueChange={handleHouseChange}
          disabled={houses.length === 0 || isPending}
        >
          <SelectTrigger className="w-full sm:w-[200px] h-11 bg-background shadow-sm rounded-xl">
            <SelectValue placeholder="Select House" />
          </SelectTrigger>
          <SelectContent>
            {houses.map((h) => (
              <SelectItem key={h.id} value={h.id}>
                {h.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedMonthId || ""}
          onValueChange={handleMonthChange}
          disabled={months.length === 0 || isPending}
        >
          <SelectTrigger className="w-full sm:w-[200px] h-11 bg-background shadow-sm rounded-xl">
            <SelectValue placeholder="Select Month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((m) => (
              <SelectItem key={m.id} value={m.id}>
                {m.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
