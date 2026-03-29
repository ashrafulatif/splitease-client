import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IDeposit } from "@/types/deposits.types";
import { MoreHorizontal, Pencil, Trash2, CalendarDays, Wallet } from "lucide-react";

export const UserDepositCard = ({
  user,
  deposits,
  onEdit,
  onDelete,
}: {
  user: any;
  deposits: IDeposit[];
  onEdit: (deposit: IDeposit) => void;
  onDelete: (deposit: IDeposit) => void;
}) => {
  const totalUserAmount = deposits.reduce((sum, d) => sum + d.amount, 0);

  const sortedDeposits = [...deposits].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="flex flex-col bg-card rounded-3xl border shadow-sm hover:shadow-md transition-shadow">
      {/* Card Header -> User Info */}
      <div className="p-5 border-b bg-muted/20 flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex justify-center items-center font-bold text-lg border border-primary/20">
            {user.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="flex flex-col">
            <h3 className="font-semibold text-lg leading-tight">{user.name}</h3>
            <span className="text-xs text-muted-foreground line-clamp-1">{user.email}</span>
          </div>
        </div>
        <Badge variant="secondary" className="font-semibold rounded-lg bg-background border px-3">
          {deposits.length} Records
        </Badge>
      </div>

      {/* Card Body -> Mini Stats */}
      <div className="grid grid-cols-1 gap-0 border-b divide-x">
        <div className="flex flex-col items-center py-4 bg-emerald-50/30 dark:bg-emerald-950/20">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5 opacity-70">
            TOTAL DEPOSITED
          </span>
          <div className="flex items-center gap-1.5 leading-none">
            <span className="text-xl font-extrabold text-emerald-600 tracking-tight">৳{totalUserAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Accordion for Deposit List */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="deposits" className="border-none">
          <AccordionTrigger className="px-5 py-3.5 hover:bg-muted/30 text-[13px] font-semibold text-muted-foreground hover:no-underline hover:text-foreground transition-colors group">
            <div className="flex items-center gap-2">
               <CalendarDays className="w-3.5 h-3.5 group-hover:text-primary transition-colors" />
               View Transaction Details
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-0 border-t">
            {sortedDeposits.length === 0 ? (
              <div className="flex flex-col items-center py-8 text-muted-foreground/40">
                <CalendarDays className="w-8 h-8 opacity-20 mb-2" />
                <span className="text-[12px] font-medium uppercase tracking-tighter">No recorded deposits</span>
              </div>
            ) : (
                <ScrollArea className="h-[240px]">
                  <div className="flex flex-col divide-y divide-muted/50">
                    {sortedDeposits.map((deposit) => {
                      const displayDate = new Intl.DateTimeFormat("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        hour: '2-digit',
                        minute: '2-digit'
                      }).format(new Date(deposit.createdAt));

                      return (
                        <div
                          key={deposit.id}
                          className="flex items-center justify-between px-5 py-4 hover:bg-muted/30 transition-colors gap-3"
                        >
                          <div className="flex flex-col min-w-0 flex-1">
                            <div className="flex items-center gap-2 mb-0.5">
                               <span className="text-sm font-bold text-foreground">৳{deposit.amount.toLocaleString()}</span>
                            </div>
                            <span className="text-[11px] font-medium text-muted-foreground/60 tracking-tight leading-none">
                              {displayDate}
                            </span>
                            {deposit.note && (
                                <p className="text-[11px] text-muted-foreground mt-2 bg-muted/50 p-2 rounded-lg border leading-relaxed line-clamp-2">
                                   "{deposit.note}"
                                </p>
                            )}
                          </div>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                className="h-8 w-8 p-0 rounded-full hover:bg-muted focus-visible:ring-0 shrink-0"
                              >
                                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="rounded-2xl p-2 min-w-[160px] shadow-xl border">
                              <button
                                onClick={() => onEdit(deposit)}
                                className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl transition-colors"
                              >
                                <Pencil className="w-4 h-4" />
                                Edit Entry
                              </button>
                              <button
                                onClick={() => onDelete(deposit)}
                                className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-xl transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                                Remove
                              </button>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
