import { NavSection } from "@/types/dashboard.type";
import { getDefaultDashboardRoute, UserRole } from "./authUtils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);

  return [
    {
      items: [
        {
          title: "Home",
          href: "/",
          icon: "Home",
        },
        {
          title: "Dashboard",
          href: defaultDashboard,
          icon: "LayoutDashboard",
        },
        {
          title: "My Profile",
          href: `/my-profile`,
          icon: "User",
        },
      ],
    },
  ];
};

export const managerNavItems: NavSection[] = [
  {
    title: "House Management",
    items: [
      {
        title: "House",
        href: "/manager/dashboard/house",
        icon: "House",
      },
      {
        title: "Members",
        href: "/manager/dashboard/members",
        icon: "Users",
      },
      {
        title: "Meals",
        href: "/manager/dashboard/meals",
        icon: "Salad",
      },
      {
        title: "months",
        href: "/manager/dashboard/months",
        icon: "Calendar",
      },
      {
        title: "Expenses",
        href: "/manager/dashboard/expenses",
        icon: "CreditCard",
      },
      {
        title: "Deposits",
        href: "/manager/dashboard/deposits",
        icon: "Wallet",
      },
      {
        title: "Subscriptions",
        href: "/manager/dashboard/subscription",
        icon: "Card",
      },
    ],
  },
];

export const adminNavItems: NavSection[] = [
  {
    title: "User Management",
    items: [
      {
        title: "All Users",
        href: "/admin/dashboard/user-management",
        icon: "Users",
      },
    ],
  },
  {
    title: "House Management",
    items: [
      {
        title: "Houses",
        href: "/admin/dashboard/house-management",
        icon: "House",
      },
    ],
  },
  {
    title: "Others",
    items: [
      {
        title: "Plans & Billing",
        href: "/admin/dashboard/plans",
        icon: "CreditCard",
      },
      {
        title: "Subscriptions",
        href: "/admin/dashboard/subscription",
        icon: "Wallet",
      },
    ],
  },
];

export const memberNavItems: NavSection[] = [
  {
    title: "Months & Meals",
    items: [
      {
        title: "Meals",
        href: "/member/dashboard/meals",
        icon: "Salad",
      },
      {
        title: "Deposits",
        href: "/member/dashboard/deposits",
        icon: "Wallet",
      },
      {
        title: "Expenses",
        href: "/member/dashboard/expenses",
        icon: "Creditcard",
      },
    ],
  },
];

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
  const commonNavItems = getCommonNavItems(role);

  switch (role) {
    case "ADMIN":
      return [...commonNavItems, ...adminNavItems];
    case "MANAGER":
      return [...commonNavItems, ...managerNavItems];
    case "MEMBER":
      return [...commonNavItems, ...memberNavItems];
  }
};
