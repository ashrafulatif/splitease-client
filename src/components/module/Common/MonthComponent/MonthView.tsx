"use client";

import { useState, useTransition } from "react";
import { AddMonthModal } from "./AddMonthModal";
import { RemoveMonthDialog } from "./RemoveMonthDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Trash2, CalendarDays, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const MonthView = ({ months = [], houses = [], selectedHouseId }: { months?: any[], houses?: any[], selectedHouseId?: string }) => {
  const [selectedMonth, setSelectedMonth] = useState<any>(null);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [isPending, startTransition] = useTransition();

  const handleHouseChange = (newHouseId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("house", newHouseId);
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const onRemove = (month: any) => {
    setSelectedMonth(month);
    setIsRemoveOpen(true);
  };

  const formatDate = (dateString: string) => {
    try {
      return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(dateString));
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden flex flex-col sm:flex-row justify-between items-start sm:items-center bg-card p-6 rounded-xl border shadow-sm gap-4">
        {/* Minimalist half-circle background */}
        <div className="absolute -left-24 top-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/10 to-transparent rounded-full pointer-events-none"></div>

        <div className="relative z-10 pl-4 border-l-4 border-primary rounded-l-sm">
          <h2 className="text-2xl font-bold tracking-tight">Months Overview</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage your house months, durations, and statuses.
          </p>
        </div>
        <div className="relative z-10 flex flex-wrap items-center gap-3">
          {houses.length > 0 && (
              <Select 
                value={selectedHouseId} 
                onValueChange={handleHouseChange}
              >
              <SelectTrigger className="w-[200px] h-10">
                  <SelectValue placeholder="Select a house" />
                </SelectTrigger>
                <SelectContent>
                  {houses.map((house: any) => (
                    <SelectItem key={house.id || house._id} value={house.id || house._id}>
                    {house.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
          )}
            <AddMonthModal houses={houses} />
          </div>
        </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden relative min-h-[200px]">
        {isPending && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/50 backdrop-blur-[2px]">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[200px] pl-6">Month Name</TableHead>
              <TableHead>House</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Metrics</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px] text-right pr-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {months.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-48 text-muted-foreground">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="rounded-full bg-muted p-3">
                      <CalendarDays className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <span>No months found. Click "Start New Month" to create one.</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              months.map((month: any) => (
                <TableRow key={month.id || month._id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="pl-6 font-semibold text-base">
                    {month.name}
                  </TableCell>
                  
                  <TableCell>
                    <span className="text-sm font-medium">{month.house?.name || 'N/A'}</span>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col gap-1 text-sm">
                      <span className="text-foreground">{formatDate(month.startDate)}</span>
                      <span className="text-muted-foreground">to {formatDate(month.endDate)}</span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                     <div className="flex gap-2 flex-wrap max-w-xs">
                        <Badge variant="outline" className="text-xs font-normal">Meals: {month._count?.meals || 0}</Badge>
                        <Badge variant="outline" className="text-xs font-normal">Deposits: {month._count?.deposits || 0}</Badge>
                        <Badge variant="outline" className="text-xs font-normal">Expenses: {month._count?.expenses || 0}</Badge>
                     </div>
                  </TableCell>

                  <TableCell>
                     {!month.isClosed ? (
                       <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50 dark:bg-emerald-500/10 dark:border-emerald-500/20 font-normal flex w-fit items-center gap-1">
                         <CheckCircle2 className="w-3 h-3" />
                         Active
                       </Badge>
                     ) : (
                       <Badge variant="outline" className="text-rose-600 border-rose-200 bg-rose-50 dark:bg-rose-500/10 dark:border-rose-500/20 font-normal flex w-fit items-center gap-1">
                         <XCircle className="w-3 h-3" />
                         Closed
                       </Badge>
                     )}
                  </TableCell>

                  <TableCell className="text-right pr-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-muted">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive cursor-pointer"
                          onClick={() => onRemove(month)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {selectedMonth && (
        <RemoveMonthDialog
          open={isRemoveOpen}
          setOpen={setIsRemoveOpen}
          monthId={selectedMonth.id || selectedMonth._id}
          monthName={selectedMonth.name}
        />
      )}
    </div>
  );
}

export default MonthView;
