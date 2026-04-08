"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { getIconComponent } from "@/lib/iconMapper";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavSection } from "@/types/dashboard.type";

import { UserInfo } from "@/types/user.type";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface DashboardSidebarContentProps {
  userInfo: UserInfo;
  navItems: NavSection[];
  dashboardHome: string;
}

export const DashboardSidebarContent = ({
  dashboardHome,
  navItems,
  userInfo,
}: DashboardSidebarContentProps) => {
  const pathname = usePathname();
  return (
    <div className="hidden md:flex h-full w-64 flex-col border-r bg-muted/50 overflow-y-auto">
      {/* Logo / Brand */}
      <div className="flex items-center h-16  px-6 border-b">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={120}
            height={40}
            priority
            className="dark:invert"
            style={{ width: "auto", height: "auto" }}
          />
        </Link>
      </div>
      {/* Navigation Area */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-6">
          {navItems.map((section, sectionId) => (
            <div key={sectionId}>
              {section.title && (
                <h4 className="mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {section.title}
                </h4>
              )}

              <div className="space-y-1">
                {section.items.map((item, itemId) => {
                  const isActive = item.href === pathname;

                  //get incon component
                  const Icon = getIconComponent(item.icon);

                  return (
                    <Link
                      key={itemId}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      {/* Icon */}
                      <Icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  );
                })}
              </div>
              {sectionId < navItems.length - 1 && (
                <Separator className="my-4" />
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* user info at bottom */}
      <div className="border-t px-4 py-4 bg-muted/20">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border border-border ring-2 ring-primary shadow-sm">
            <AvatarImage src={userInfo.image} alt={userInfo.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold font-black">
              {userInfo.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate">{userInfo.name}</p>
            <p className="text-xs text-muted-foreground capitalize">
              {userInfo.role.toLocaleLowerCase().replace("_", " ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
