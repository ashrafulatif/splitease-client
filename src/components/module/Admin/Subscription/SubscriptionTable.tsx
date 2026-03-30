/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { CreditCard, Calendar, CheckCircle2, AlertCircle, XCircle, Clock } from "lucide-react";
import { ISubscription } from "@/types/subscription.types";
import { cn } from "@/lib/utils";

interface SubscriptionTableProps {
  subscriptions: ISubscription[];
}

export const SubscriptionTable = ({ subscriptions = [] }: SubscriptionTableProps) => {
  return (
    <div className="rounded-3xl border border-border/50 bg-white shadow-sm overflow-hidden transition-all hover:shadow-md">
      <Table>
        <TableHeader className="bg-stone-50/50">
          <TableRow className="hover:bg-transparent border-border/50">
            <TableHead className="w-[300px] pl-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">Subscriber Identity</TableHead>
            <TableHead className="py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">Plan Tier</TableHead>
            <TableHead className="py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 text-center">Lifecycle</TableHead>
            <TableHead className="py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 text-right">Revenue Track</TableHead>
            <TableHead className="w-[120px] text-right pr-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscriptions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center h-64 text-muted-foreground font-bold opacity-50 uppercase tracking-[0.2em] text-xs">
                No platform subscriptions found
              </TableCell>
            </TableRow>
          ) : (
            subscriptions.map((sub) => (
              <TableRow key={sub.id} className="hover:bg-stone-50/50 border-border/40 transition-colors group">
                <TableCell className="pl-8 py-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10 rounded-full border-2 border-stone-50 overflow-hidden shadow-sm shadow-stone-100 transition-transform group-hover:scale-105">
                      <AvatarImage src={sub.user.image} />
                      <AvatarFallback className="bg-stone-100 text-stone-400 font-bold uppercase">
                        {sub.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-black text-foreground tracking-tight">{sub.user.name}</p>
                      <p className="text-[10px] font-bold text-muted-foreground/60 tracking-tight">
                        {sub.user.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-6">
                  <div className="space-y-1.5">
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/10 font-black text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-lg">
                      {sub.plan.name}
                    </Badge>
                    <p className="text-[10px] font-bold text-muted-foreground/60 pl-1 uppercase tracking-tighter">
                      ${sub.plan.price} / {sub.plan.durationDays} Days
                    </p>
                  </div>
                </TableCell>
                <TableCell className="py-6">
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-2 group/date">
                      <Calendar className="w-3 h-3 text-muted-foreground/40 group-hover/date:text-primary transition-colors" />
                      <span className="text-[11px] font-black text-foreground tracking-tight">
                        {format(new Date(sub.startDate), "MMM dd")}
                      </span>
                      <span className="text-[10px] font-bold text-muted-foreground/30">→</span>
                      <span className={cn(
                        "text-[11px] font-black tracking-tight",
                        new Date(sub.endDate) < new Date() ? "text-rose-500" : "text-foreground"
                      )}>
                        {format(new Date(sub.endDate), "MMM dd, yyyy")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                       <Clock className="w-2.5 h-2.5 text-muted-foreground/30" />
                       <span className="text-[9px] font-bold text-muted-foreground/40 uppercase">
                          Activated {format(new Date(sub.createdAt), "hh:mm a")}
                       </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-6 text-right">
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1.5 justify-end">
                      <CreditCard className="w-3.5 h-3.5 text-stone-300" />
                      <span className="text-base font-black text-foreground tracking-tighter leading-none">
                        ${sub.payments?.[0]?.amount?.toLocaleString() || "0.00"}
                      </span>
                    </div>
                    {sub.payments?.[0] && (
                      <Badge variant="outline" className="border-none bg-stone-100 text-stone-500 text-[8px] font-bold uppercase tracking-widest px-1.5 py-0 h-4">
                        Ref: {sub.payments[0].id.slice(0, 8)}...
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="py-6 text-right pr-8">
                  <StatusBadge status={sub.status} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const configs: Record<string, { label: string; icon: any; className: string }> = {
    ACTIVE: {
      label: "Active",
      icon: CheckCircle2,
      className: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    EXPIRED: {
      label: "Expired",
      icon: XCircle,
      className: "bg-rose-50 text-rose-600 border-rose-100",
    },
    PENDING: {
      label: "Pending",
      icon: Clock,
      className: "bg-amber-50 text-amber-600 border-amber-100",
    },
    CANCELLED: {
      label: "Cancelled",
      icon: AlertCircle,
      className: "bg-stone-100 text-stone-500 border-stone-200",
    },
  };

  const config = configs[status] || configs.CANCELLED;
  const Icon = config.icon;

  return (
    <Badge 
      variant="outline" 
      className={cn(
        "font-black text-[9px] tracking-widest uppercase rounded-full px-3 py-1 flex items-center justify-center gap-1.5 ml-auto w-fit transition-all duration-300",
        config.className
      )}
    >
      <Icon className="w-3 h-3" />
      {config.label}
    </Badge>
  );
};
