import { Metadata } from "next";
import MainDashboardContent from "@/components/module/Dashboard/MainDashboardContent/MainDashboardContent";
import { getUserInfo } from "@/service/auth.service";
import { DashboardService } from "@/service/manager-service/Dashboard.service";

const ManagerDashboard = async () => {
  const userInfo = await getUserInfo();
const statsRes = await DashboardService.getDashboardSummary();
  const stats = statsRes?.data || null;

  const roleTitle = "Manager Dashboard"

  return (
    <div className="p-4 md:p-6 md:max-w-6xl mx-auto w-full min-h-screen">
      <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          {roleTitle}
        </h1>
        <p className="text-muted-foreground mt-2 text-xs font-bold uppercase tracking-[0.2em] opacity-70">
          Personalized analytics and activity overview
        </p>
      </div>
      <MainDashboardContent stats={stats} userInfo={userInfo} />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Overview of your house and financial analytics",
};

export default ManagerDashboard;
