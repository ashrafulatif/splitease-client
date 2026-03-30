/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from "next";
import { getMyHouseAction } from "../house/_action";
import { getHouseMonthsAction } from "../months/_action";
import { getDepositsByMonthAction } from "./_action";
import { DepositView } from "@/components/module/Common/DepositComponents/DepositView";
import { getHouseMembersAction } from "../members/_action";

const DepositsPage = async (props: {
  searchParams: Promise<{ house?: string; month?: string }>;
}) => {
  const searchParams = await props.searchParams;

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
      />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Deposits",
  description: "Manage house member deposits and track contributions",
};

export default DepositsPage;
