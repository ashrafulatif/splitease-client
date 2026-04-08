"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { LayoutDashboard, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getDefaultDashboardRoute } from "@/lib/authUtils";
import { UserInfo } from "@/types/user.type";
import { logoutUserAction } from "@/app/(commonLayout)/(authRouteGroup)/logout/_action";
import { ModeToggle } from "./ModeToggle";

type NavbarClientProps = {
  userInfo: UserInfo | null;
};

export default function NavbarClient({ userInfo }: NavbarClientProps) {
  const [open, setOpen] = React.useState(false);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const scrolled = useScroll(10);
  const router = useRouter();

  const dashboardHref = userInfo
    ? getDefaultDashboardRoute(userInfo.role)
    : "/member/dashboard";

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logoutUserAction();
      setOpen(false);
      router.push("/login");
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  };

  const publicRoutes = [
    { label: "Pricing", href: "/pricing" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Policy", href: "/policy" },
  ];

  const navRoutes = userInfo
    ? userInfo.role === "ADMIN"
      ? [
          ...publicRoutes,
          { label: "Users", href: `${dashboardHref}/user-management` },
          { label: "Houses", href: `${dashboardHref}/house-management` },
        ]
      : [
          ...publicRoutes,
          { label: "Expenses", href: `${dashboardHref}/expenses` },
          { label: "Meals", href: `${dashboardHref}/meals` },
        ]
    : publicRoutes;

  return (
    <header
      className={cn("sticky top-0 z-50 w-full border-b border-transparent", {
        "bg-background/95 supports-backdrop-filter:bg-background/50 border-border backdrop-blur-lg":
          scrolled,
      })}
    >
      <nav className="mx-auto flex h-18 w-full max-w-5xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="rounded-md">
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
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {navRoutes.map((route) => (
                <NavigationMenuLink key={route.href} className="px-4" asChild>
                  <Link
                    href={route.href}
                    className="hover:text-primary text-xs rounded-md p-2 whitespace-nowrap"
                  >
                    {route.label}
                  </Link>
                </NavigationMenuLink>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <ModeToggle />
          {userInfo ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon-lg"
                  className="rounded-full cursor-pointer ring-2 ring-primary overflow-hidden p-0"
                  aria-label="Open user menu"
                >
                  <Avatar className="size-full">
                    <AvatarImage src={userInfo.image} alt={userInfo.name} />
                    <AvatarFallback className="bg-background text-sm font-semibold select-none">
                      {userInfo.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuItem asChild>
                  <Link href={dashboardHref} className="cursor-pointer">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/my-profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-red-600"
                  disabled={isLoggingOut}
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
        </div>

        <Button
          size="icon"
          variant="outline"
          onClick={() => setOpen(!open)}
          className="md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          <MenuToggleIcon open={open} className="size-5" duration={300} />
        </Button>
      </nav>

      <MobileMenu
        open={open}
        className="flex flex-col justify-between gap-4 overflow-y-auto"
      >
        <div className="flex w-full flex-col gap-3 font-medium">
          {navRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="hover:text-primary rounded-md p-2"
              onClick={() => setOpen(false)}
            >
              {route.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          {userInfo ? (
            <>
              <Link href={dashboardHref} onClick={() => setOpen(false)}>
                <Button className="w-full">Dashboard</Button>
              </Link>
              <Link href="/my-profile" onClick={() => setOpen(false)}>
                <Button variant="outline" className="w-full bg-transparent">
                  Profile
                </Button>
              </Link>
              <Button
                variant="outline"
                className="w-full bg-transparent text-red-600"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? "Logging out..." : "Logout"}
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setOpen(false)}>
                <Button variant="outline" className="w-full bg-transparent">
                  Sign In
                </Button>
              </Link>
              <Link href="/register" onClick={() => setOpen(false)}>
                <Button className="w-full">Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </MobileMenu>
    </header>
  );
}

type MobileMenuProps = React.ComponentProps<"div"> & {
  open: boolean;
};

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
  if (!open || typeof window === "undefined") return null;

  return createPortal(
    <div
      id="mobile-menu"
      className={cn(
        "bg-background/95 supports-backdrop-filter:bg-background/50 backdrop-blur-lg",
        "fixed top-14 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-y md:hidden",
      )}
    >
      <div
        data-slot={open ? "open" : "closed"}
        className={cn(
          "data-[slot=open]:animate-in data-[slot=open]:zoom-in-97 ease-out",
          "size-full p-4",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

function useScroll(threshold: number) {
  const [scrolled, setScrolled] = React.useState(false);

  const onScroll = React.useCallback(() => {
    setScrolled(window.scrollY > threshold);
  }, [threshold]);

  React.useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  React.useEffect(() => {
    onScroll();
  }, [onScroll]);

  return scrolled;
}
