/* eslint-disable @typescript-eslint/no-explicit-any */
import { getMyHouseAction } from "@/app/(dashboardLayout)/manager/dashboard/house/_action";
import { getMealsByMonthAction } from "@/app/(dashboardLayout)/manager/dashboard/meals/_action";
import { getHouseMonthsAction } from "@/app/(dashboardLayout)/manager/dashboard/months/_action";
import MealView from "@/components/module/Manager/MealsComponent/MealView";
import { getUserInfo } from "@/service/auth.service";
import { DashboardService } from "@/service/manager-service/Dashboard.service";
import { Metadata } from "next";

const MemberMealsPage = async (props: {
  searchParams: Promise<{ house?: string; month?: string }>;
}) => {
  const searchParams = await props.searchParams;
  const userInfo = await getUserInfo();

  const housesRes = await getMyHouseAction();
  const houses = housesRes?.data || [];

  const selectedHouseId = searchParams?.house || houses[0]?.id;

  let months = [];
  if (selectedHouseId) {
    const monthsRes = await getHouseMonthsAction(selectedHouseId);
    months = monthsRes?.data || [];
  }

  const selectedMonthId =
    searchParams?.month ||
    months.find((m: any) => !m.isClosed)?.id ||
    months[0]?.id;

  let meals = [];
  if (selectedMonthId) {
    const mealsRes = await getMealsByMonthAction(selectedMonthId);
    meals = mealsRes?.data || [];
  }

  let mealRate = 0;
  if (selectedMonthId) {
    const monthlySummaryRes =
      await DashboardService.getMonthlySummary(selectedMonthId);
    mealRate = monthlySummaryRes?.data?.mealRate || 0;
  }

  return (
    <div className="p-4 md:p-6 md:max-w-6xl mx-auto w-full">
      <MealView
        meals={meals}
        houses={houses}
        months={months}
        selectedHouseId={selectedHouseId}
        selectedMonthId={selectedMonthId}
        currentUserRole={userInfo?.role}
        mealRate={mealRate}
      />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Meals",
  description: "Manage your house meals and distributions",
};

export default MemberMealsPage;
