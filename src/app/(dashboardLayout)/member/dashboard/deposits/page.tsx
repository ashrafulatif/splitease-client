/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from "next";

import { DepositView } from "@/components/module/Manager/DepositComponents/DepositView";
import { getMyHouseAction } from "@/app/(dashboardLayout)/manager/dashboard/house/_action";
import { getHouseMonthsAction } from "@/app/(dashboardLayout)/manager/dashboard/months/_action";
import { getHouseMembersAction } from "@/app/(dashboardLayout)/manager/dashboard/members/_action";
import { getDepositsByMonthAction } from "@/app/(dashboardLayout)/manager/dashboard/deposits/_action";
import { getUserInfo } from "@/service/auth.service";

const MemberDepositsPage = async (props: {
  searchParams: Promise<{ house?: string; month?: string }>;
}) => {
  const searchParams = await props.searchParams;
  const userInfo = await getUserInfo();

  const housesRes = await getMyHouseAction();
  const houses = housesRes?.data || [];

  const selectedHouseId = searchParams?.house || houses[0]?.id;

  let months = [];
  let members = [];
  if (selectedHouseId) {
    const [monthsRes, membersRes] = await Promise.all([
      getHouseMonthsAction(selectedHouseId),
      getHouseMembersAction(selectedHouseId),
    ]);
    months = monthsRes?.data || [];
    members = membersRes?.data || [];
  }

  const selectedMonthId =
    searchParams?.month ||
    months.find((m: any) => !m.isClosed)?.id ||
    months[0]?.id;

  let deposits = [];
  if (selectedMonthId) {
    const depositsRes = await getDepositsByMonthAction(selectedMonthId);
    deposits = depositsRes?.data || [];
  }

  return (
    <div className="p-4 md:p-6 md:max-w-6xl mx-auto w-full">
      <DepositView
        deposits={deposits}
        houses={houses}
        months={months}
        members={members}
        selectedHouseId={selectedHouseId}
        selectedMonthId={selectedMonthId}
        currentUserRole={userInfo?.role}
      />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Deposits",
  description: "Manage house member deposits and track contributions",
};

export default MemberDepositsPage;
