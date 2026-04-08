import DashboardNavbar from "@/components/module/Dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/module/Dashboard/DashboardSidebar";
import { ChatbotWidget } from "@/components/module/Dashboard/ChatbotWidget/ChatbotWidget";
import React from "react";

const RootDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* dashboard sidebar */}
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Dashboard Navbar */}
        <DashboardNavbar />
        {/* Dashboard content */}
        <main className="flex-1 overflow-y-auto bg-muted/10 p-4 md:p-6">
          <div>{children}</div>
        </main>
      </div>
      {/* Global Dashboard AI Assistant */}
      <ChatbotWidget />
    </div>
  );
};

export default RootDashboardLayout;
