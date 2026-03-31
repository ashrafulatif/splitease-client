"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronRight, LayoutDashboard } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import DashboardMobileSidebar from "./DashboardMobileSidebar";
import UserDropdown from "./UserDropdown";
import { UserInfo } from "@/types/user.type";
import { NavSection } from "@/types/dashboard.type";

interface DashboardNavbarProps {
  userInfo: UserInfo;
  navItems: NavSection[];
  dashboardHome: string;
}

const DashboardNavbarContent = ({
  dashboardHome,
  navItems,
  userInfo,
}: DashboardNavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Build breadcrumb segments from pathname
  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map(
      (seg) => seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " "),
    );

  useEffect(() => {
    const checkSmallerScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkSmallerScreen();
    window.addEventListener("resize", checkSmallerScreen);

    return () => {
      window.removeEventListener("resize", checkSmallerScreen);
    };
  }, []);

  return (
    <div className="flex items-center gap-4 w-full px-4 py-3 border-b h-16 bg-background">
      {/* Mobile Menu */}
      <Sheet open={isOpen && isMobile} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant={"outline"} size={"icon"}>
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <DashboardMobileSidebar
            userInfo={userInfo}
            dashboardHome={dashboardHome}
            navItems={navItems}
          />
        </SheetContent>
      </Sheet>

      {/* Breadcrumb */}
      <div className="flex-1 flex items-center gap-1.5 text-sm hidden sm:flex">
        <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
        {segments.map((seg, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
            <span
              className={
                i === segments.length - 1
                  ? "font-medium text-foreground"
                  : "text-muted-foreground"
              }
            >
              {seg}
            </span>
          </span>
        ))}
      </div>

      {/* User Dropdown */}
      <UserDropdown userInfo={userInfo} />
    </div>
  );
};

export default DashboardNavbarContent;
