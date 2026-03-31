"use client";
import {
  Home,
  Users,
  CalendarDays,
  Utensils,
  ReceiptText,
  Wallet,
  TrendingUp,
  ShieldCheck,
  CreditCard,
  Activity,
  UserCheck,
  Building2,
  HandCoins,
  ArrowUpRight,
} from "lucide-react";
import { StatsCard } from "../../shared/StatsCard";
import { MainPieChart } from "../../shared/MainPieChart";
import { MainBarChart } from "../../shared/MainBarChart";
import { IDashboardStats } from "@/types/stats.types";
import { UserInfo } from "@/types/user.type";
interface MainDashboardContentProps {
  stats: IDashboardStats | null;
  userInfo: UserInfo;
}
const MainDashboardContent = ({
  stats,
  userInfo,
}: MainDashboardContentProps) => {
  if (!stats) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-card rounded-3xl border border-dashed shadow-sm">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Activity className="w-8 h-8 text-muted-foreground/50" />
        </div>
        <h3 className="text-lg font-bold uppercase tracking-tight">
          No statistics available
        </h3>
        <p className="text-muted-foreground text-sm max-w-sm text-center mt-1 font-medium">
          Start by creating houses and adding months to see your dashboard
          analytics.
        </p>
      </div>
    );
  }
  const role = userInfo?.role;
  const userName = userInfo?.name || "User";
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };
  return (
    <div className="space-y-6">
      {/* Dynamic Hero Header */}
      <div className="relative overflow-hidden bg-primary/5 rounded-3xl p-6 md:p-8 border border-primary/10 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 group">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/20 transition-all duration-700"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/15 transition-all duration-700"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              <span className="text-[9px] font-black uppercase tracking-widest text-primary leading-none">
                Live Analytics
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground leading-tight">
              {getGreeting()},{" "}
              <span className="text-primary italic">{userName}</span>
            </h2>
            <p className="text-muted-foreground max-w-lg text-xs font-semibold leading-relaxed opacity-70">
              {role === "ADMIN"
                ? "Global platform overview. Monitor system growth, total revenue, and house metrics."
                : role === "MANAGER"
                  ? "Track house performance, manage financials, and monitor monthly operations."
                  : "Overview of your personal contributions, meal activity, and house balances."}
            </p>
          </div>
          <div className="hidden md:flex flex-col items-end opacity-20 group-hover:opacity-40 transition-opacity">
            <span className="text-4xl font-black text-primary tracking-tighter select-none">
              {role}
            </span>
            <span className="text-[9px] font-black text-primary tracking-[0.3em] uppercase mt-[-8px]">
              Authorized
            </span>
          </div>
        </div>
      </div>

      {/* Conditional Stats Logic Based on Role */}
      <div className="space-y-6">
        {/* ADMIN VIEW */}
        {role === "ADMIN" && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                title="Total Users"
                value={stats.userCount || 0}
                icon={UserCheck}
                description="Registered users"
                className="bg-muted/50"
                iconClassName="bg-primary/10 rounded-full"
              />
              <StatsCard
                title="Total Houses"
                value={stats.houseCount || 0}
                icon={Building2}
                description="Active properties"
                className="bg-muted/50"
                iconClassName="bg-primary/10 rounded-full"
              />
              <StatsCard
                title="Total Members"
                value={stats.houseMemberCount || 0}
                icon={Users}
                description="House members"
                className="bg-muted/50"
                iconClassName="bg-primary/10 rounded-full"
              />
              <StatsCard
                title="Total Revenue"
                value={`৳${stats.totalRevenue || 0}`}
                icon={HandCoins}
                description="Gross income"
                className="bg-muted/50"
                iconClassName="bg-primary/10 rounded-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatsCard
                title="System Expenses"
                value={`৳${stats.totalExpense || 0}`}
                icon={ReceiptText}
                description="Global overheads"
                className="bg-muted/50"
                iconClassName="bg-primary/10 rounded-full"
              />
              <StatsCard
                title="Total Deposits"
                value={`৳${stats.totalDeposit || 0}`}
                icon={Wallet}
                description="Funds in system"
                className="bg-muted/50"
                iconClassName="bg-primary/10 rounded-full"
              />
              <StatsCard
                title="Capital Balance"
                value={`৳${stats.currentBalance || 0}`}
                icon={TrendingUp}
                description="Net liquidity"
                className="bg-muted/50"
                iconClassName="bg-primary/10 rounded-full"
              />
            </div>
          </>
        )}

        {/* MANAGER VIEW */}
        {role === "MANAGER" && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                title="Your Houses"
                value={stats.houseCount || 0}
                icon={Home}
                description="Managed properties"
                className="bg-muted/50"
                iconClassName="bg-primary/10 rounded-full"
              />
              <StatsCard
                title="Your Members"
                value={stats.memberCount || 0}
                icon={Users}
                description="Active members"
                className="bg-muted/50"
                iconClassName="bg-primary/10 rounded-full"
              />
              <StatsCard
                title="Months"
                value={stats.monthCount || 0}
                icon={CalendarDays}
                description="Operational history"
                className="bg-muted/50"
                iconClassName="bg-primary/10 rounded-full"
              />
              <StatsCard
                title="Meal Count"
                value={stats.mealCount || 0}
                icon={Utensils}
                description="Total distributed"
                className="bg-muted/50"
                iconClassName="bg-primary/10 rounded-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatsCard
                title="House Deposits"
                value={`৳${stats.totalDeposit || 0}`}
                icon={Wallet}
                description="Accumulated funds"
                className="bg-muted/50"
                iconClassName="bg-primary/10 rounded-full"
              />
              <StatsCard
                title="House Expenses"
                value={`৳${stats.totalExpense || 0}`}
                icon={ReceiptText}
                description="Utility costs"
                className="bg-muted/50"
                iconClassName="bg-primary/10 rounded-full"
              />
              <StatsCard
                title="Net Balance"
                value={`৳${stats.currentBalance || 0}`}
                icon={TrendingUp}
                description="House liquidity"
                className="bg-muted/50"
                iconClassName="bg-primary/10 rounded-full"
              />
            </div>
          </>
        )}

        {/* MEMBER VIEW */}
        {role === "MEMBER" && (
          <>
            <div className="grid grid-cols-3 gap-4">
              <StatsCard
                title="Houses"
                value={stats.joinedHouseCount || 0}
                icon={Home}
                description="Active homes"
                className="bg-muted/50"
                iconClassName="bg-primary/10 rounded-full"
              />
              <StatsCard
                title="My Meals"
                value={stats.mealCount || 0}
                icon={Utensils}
                description="Total consumed"
                className="bg-muted/50"
                iconClassName="bg-primary/10 rounded-full"
              />
              <StatsCard
                title="Expense Rec"
                value={stats.myExpenseCount || 0}
                icon={ReceiptText}
                description="Logged by you"
                className="bg-muted/50"
                iconClassName="bg-primary/10 rounded-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatsCard
                title="My Deposits"
                value={`৳${stats.totalDeposit || 0}`}
                icon={Wallet}
                description="Your funds"
                className="bg-muted/50"
                iconClassName="bg-primary/10 rounded-full"
              />
              <StatsCard
                title="My Expenses"
                value={`৳${stats.myExpense || 0}`}
                icon={ArrowUpRight}
                description="Spent locally"
                className="bg-muted/50"
                iconClassName="bg-primary/10 rounded-full"
              />
              <StatsCard
                title="Standing"
                value={`৳${stats.netContribution || 0}`}
                icon={TrendingUp}
                description="Personal net"
                className="bg-muted/50"
                iconClassName="bg-primary/10 rounded-full"
              />
            </div>
          </>
        )}

        {/* Common Analytics (Charts) - Every role gets visual insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 pt-2">
          <div className="lg:col-span-2">
            <MainPieChart
              data={stats.pieChartData}
              title="Category Split"
              description="Expenditure distribution"
            />
          </div>
          <div className="lg:col-span-3">
            <MainBarChart
              data={stats.barChartData}
              title="Records Trend"
              description="Monthly operational growth"
            />
          </div>
        </div>

        {/* Platform Engagement Block (Lower priorities) */}
        {(role === "MANAGER" || role === "ADMIN") && (
          <div className="grid grid-cols-2 gap-4">
            <StatsCard
              title={role === "ADMIN" ? "Active Subs" : "Plan"}
              value={stats.activeSubscriptionCount || 0}
              icon={ShieldCheck}
              description={
                role === "ADMIN" ? "Global active" : "Premium status"
              }
              className="bg-muted/50"
              iconClassName="bg-primary/10 rounded-full"
            />
            <StatsCard
              title={role === "ADMIN" ? "Revenue" : "Payments"}
              value={`৳${stats.totalSubscriptionPaid || 0}`}
              icon={CreditCard}
              description={role === "ADMIN" ? "Platform income" : "Fee history"}
              className="bg-muted/50"
              iconClassName="bg-primary/10 rounded-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default MainDashboardContent;
