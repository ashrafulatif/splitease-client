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
  ArrowUpRight
} from "lucide-react";
import { StatsCard } from "../../shared/StatsCard";
import { MainPieChart } from "../../shared/MainPieChart";
import { MainBarChart } from "../../shared/MainBarChart";
import { IDashboardStats } from "@/types/stats.types";
interface MainDashboardContentProps {
  stats: IDashboardStats | null;
  userInfo: any;
}
const MainDashboardContent = ({ stats, userInfo }: MainDashboardContentProps) => {
  if (!stats) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-card rounded-3xl border border-dashed shadow-sm">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Activity className="w-8 h-8 text-muted-foreground/50" />
        </div>
        <h3 className="text-lg font-bold uppercase tracking-tight">No statistics available</h3>
        <p className="text-muted-foreground text-sm max-w-sm text-center mt-1 font-medium">
          Start by creating houses and adding months to see your dashboard analytics.
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
                <span className="text-[9px] font-black uppercase tracking-widest text-primary leading-none">Live Analytics</span>
             </div>
             <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground leading-tight">
                {getGreeting()}, <span className="text-primary italic">{userName}</span>
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
             <span className="text-4xl font-black text-primary tracking-tighter select-none">{role}</span>
             <span className="text-[9px] font-black text-primary tracking-[0.3em] uppercase mt-[-8px]">Authorized</span>
          </div>
        </div>
      </div>

      {/* Conditional Stats Logic Based on Role */}
      <div className="space-y-6">
        
        {/* ADMIN VIEW */}
        {role === "ADMIN" && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard title="Total Users" value={stats.userCount || 0} icon={UserCheck} description="Registered users" iconClassName="bg-blue-500/10" />
              <StatsCard title="Total Houses" value={stats.houseCount || 0} icon={Building2} description="Active properties" iconClassName="bg-emerald-500/10" />
              <StatsCard title="Total Members" value={stats.houseMemberCount || 0} icon={Users} description="House members" iconClassName="bg-indigo-500/10" />
              <StatsCard title="Total Revenue" value={`৳${stats.totalRevenue || 0}`} icon={HandCoins} description="Gross income" iconClassName="bg-orange-500/10" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <StatsCard title="System Expenses" value={`৳${stats.totalExpense || 0}`} icon={ReceiptText} description="Global overheads" iconClassName="bg-destructive/10" />
               <StatsCard title="Total Deposits" value={`৳${stats.totalDeposit || 0}`} icon={Wallet} description="Funds in system" iconClassName="bg-emerald-500/10" />
               <StatsCard title="Capital Balance" value={`৳${stats.currentBalance || 0}`} icon={TrendingUp} description="Net liquidity" iconClassName="bg-primary/10" />
            </div>
          </>
        )}

        {/* MANAGER VIEW */}
        {role === "MANAGER" && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard title="Your Houses" value={stats.houseCount || 0} icon={Home} description="Managed properties" iconClassName="bg-blue-500/10" />
              <StatsCard title="Your Members" value={stats.memberCount || 0} icon={Users} description="Active members" iconClassName="bg-emerald-500/10" />
              <StatsCard title="Months" value={stats.monthCount || 0} icon={CalendarDays} description="Operational history" iconClassName="bg-indigo-500/10" />
              <StatsCard title="Meal Count" value={stats.mealCount || 0} icon={Utensils} description="Total distributed" iconClassName="bg-orange-500/10" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <StatsCard title="House Deposits" value={`৳${stats.totalDeposit || 0}`} icon={Wallet} description="Accumulated funds" className="bg-emerald-500/5" iconClassName="bg-emerald-500/10" />
               <StatsCard title="House Expenses" value={`৳${stats.totalExpense || 0}`} icon={ReceiptText} description="Utility costs" className="bg-destructive/5" iconClassName="bg-destructive/10" />
               <StatsCard title="Net Balance" value={`৳${stats.currentBalance || 0}`} icon={TrendingUp} description="House liquidity" className="bg-primary/5" iconClassName="bg-primary/10" />
            </div>
          </>
        )}

        {/* MEMBER VIEW */}
        {role === "MEMBER" && (
          <>
            <div className="grid grid-cols-3 gap-4">
              <StatsCard title="Houses" value={stats.joinedHouseCount || 0} icon={Home} description="Active homes" iconClassName="bg-blue-500/10" />
              <StatsCard title="My Meals" value={stats.mealCount || 0} icon={Utensils} description="Total consumed" iconClassName="bg-orange-500/10" />
              <StatsCard title="Expense Rec" value={stats.myExpenseCount || 0} icon={ReceiptText} description="Logged by you" iconClassName="bg-indigo-500/10" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <StatsCard title="My Deposits" value={`৳${stats.totalDeposit || 0}`} icon={Wallet} description="Your funds" className="bg-emerald-500/5" iconClassName="bg-emerald-500/10" />
               <StatsCard title="My Expenses" value={`৳${stats.myExpense || 0}`} icon={ArrowUpRight} description="Spent locally" className="bg-destructive/5" iconClassName="bg-destructive/10" />
               <StatsCard title="Standing" value={`৳${stats.netContribution || 0}`} icon={TrendingUp} description="Personal net" className="bg-primary/5" iconClassName="bg-primary/10" />
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
                description={role === "ADMIN" ? "Global active" : "Premium status"}
                iconClassName="bg-amber-500/10"
             />
             <StatsCard 
                title={role === "ADMIN" ? "Revenue" : "Payments"}
                value={`৳${stats.totalSubscriptionPaid || 0}`}
                icon={CreditCard}
                description={role === "ADMIN" ? "Platform income" : "Fee history"}
                iconClassName="bg-cyan-500/10"
             />
          </div>
        )}
      </div>
    </div>
  );

};
export default MainDashboardContent;