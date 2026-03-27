import { getDefaultDashboardRoute } from "@/lib/authUtils";

import { DashboardSidebarContent } from "./DashboardSidebarContent";
import { NavSection } from "@/types/dashboard.type";
import { getNavItemsByRole } from "@/lib/navItems";

const DashboardSidebar = async () => {
  // const userInfo = await getUserInfo();
  const navItems: NavSection[] = getNavItemsByRole(userInfo.role);
  const dashboardHome = getDefaultDashboardRoute(userInfo.role);

  return (
    <DashboardSidebarContent
      dashboardHome={dashboardHome}
      navItems={navItems}
      // userInfo={userInfo}
    />
  );
};

export default DashboardSidebar;
