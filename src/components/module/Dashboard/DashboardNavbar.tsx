import { getDefaultDashboardRoute } from "@/lib/authUtils";
import { getNavItemsByRole } from "@/lib/navItems";
import { NavSection } from "@/types/dashboard.type";
import DashboardNavbarContent from "./DashboardNavbarContent";
import { getUserInfo } from "@/service/auth.service";

const DashboardNavbar = async () => {
  const userInfo = await getUserInfo();

  if (!userInfo) {
    return null; 
  }
  const navItems: NavSection[] = getNavItemsByRole(userInfo.role);
  const dashboardHome = getDefaultDashboardRoute(userInfo.role);

  return (
    <DashboardNavbarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardNavbar;
