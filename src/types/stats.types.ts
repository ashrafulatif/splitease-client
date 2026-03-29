export interface IChartItem {
  label: string;
  value: number;
}

export interface IDashboardStats {
  // Common
  houseCount?: number;
  monthCount?: number;
  mealCount?: number;
  expenseCount?: number;
  totalExpense?: number;
  totalDeposit?: number;
  currentBalance?: number;
  activeSubscriptionCount?: number;
  totalSubscriptionPaid?: number;
  pieChartData: IChartItem[];
  barChartData: IChartItem[];

  // Admin Specific
  userCount?: number;
  houseMemberCount?: number;
  depositCount?: number;
  subscriptionCount?: number;
  paymentCount?: number;
  totalRevenue?: number;

  // Manager Specific
  memberCount?: number; // In manager, it's called memberCount, in admin houseMemberCount

  // Member Specific
  joinedHouseCount?: number;
  myExpenseCount?: number;
  myExpense?: number;
  netContribution?: number;
}

export interface IMonthlySummary {
  mealRate: number;
  totalExpense: number;
  totalMeals: number;
  currentBalance: number;
  users: {
    userId: string;
    totalMeals: number;
    deposit: number;
    cost: number;
    balance: number;
  }[];
}
