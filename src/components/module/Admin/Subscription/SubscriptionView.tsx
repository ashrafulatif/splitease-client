/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Search, CreditCard, PieChart, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ISubscription } from "@/types/subscription.types";
import { SubscriptionTable } from "./SubscriptionTable";

interface SubscriptionViewProps {
  subscriptions: ISubscription[];
}

const SubscriptionView = ({ subscriptions = [] }: SubscriptionViewProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSubscriptions = subscriptions.filter(
    (sub) =>
      sub.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.plan.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalRevenue = subscriptions.reduce(
    (acc, sub) => acc + (sub.payments?.[0]?.amount || 0),
    0,
  );
  const activeSubs = subscriptions.filter((s) => s.status === "ACTIVE").length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-8 border border-border/50 shadow-sm gap-6 transition-all hover:shadow-md">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
              <CreditCard className="w-4 h-4" />
            </div>
            <h2 className="text-3xl font-black tracking-tight text-foreground leading-none">
              Revenue Governance
            </h2>
          </div>
          <p className="text-muted-foreground font-medium text-sm max-w-md pl-8 pt-1">
            Analyze platform-wide subscriptions, financial lifecycle events, and
            transaction auditing.
          </p>
        </div>

        <div className="relative w-full sm:w-[380px]">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/50">
            <Search className="w-4 h-4" />
          </div>
          <Input
            placeholder="Filter by subscriber or plan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-11 rounded-2xl h-12 bg-stone-50/50 border focus-visible:ring-primary/20 text-sm font-bold tracking-tight transition-all focus:bg-white focus:shadow-lg focus:shadow-stone-100"
          />
        </div>
      </div>

      {/* Stats Summary - Mini Pills */}
      <div className="flex flex-wrap gap-4 px-2">
        <RevenuePill
          label="Gross Terminal Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          icon={TrendingUp}
          color="text-primary"
          bg="bg-primary/10"
        />
        <RevenuePill
          label="Active Subscriptions"
          value={activeSubs.toString()}
          icon={PieChart}
          color="text-primary"
          bg="bg-primary/10"
        />
      </div>

      {/* Table Section */}
      <SubscriptionTable subscriptions={filteredSubscriptions} />
    </div>
  );
};

const RevenuePill = ({ label, value, icon: Icon, color, bg }: any) => (
  <div className="flex items-center gap-3 px-5 py-2.5  border border-border/40 bg-white shadow-sm hover:shadow-md transition-all group">
    <div className={`p-1.5 rounded-full ${bg} ${color}`}>
      <Icon className="w-4 h-4" />
    </div>
    <div className="flex flex-col gap-0">
      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 leading-none">
        {label}
      </span>
      <span className="text-lg font-black tracking-tighter text-foreground leading-tight group-hover:text-primary transition-colors">
        {value}
      </span>
    </div>
  </div>
);

export default SubscriptionView;
