import MonthView from "@/components/module/Common/MonthComponent/MonthView";
import { Metadata } from "next";
import { getHouseMonthsAction } from "./_action";
import { getMyHouseAction } from "../house/_action";

const MonthsPage = async (props: {
  searchParams: Promise<{ house?: string }>;
}) => {
  const searchParams = await props.searchParams;

  const housesRes = await getMyHouseAction();
  const houses = housesRes?.data || [];

  const selectedHouseId = searchParams?.house || houses[0]?.id;

  let months = [];
  if (selectedHouseId) {
    const monthsRes = await getHouseMonthsAction(selectedHouseId);
    months = monthsRes?.data || [];
  }

  return (
    <div className="p-4 md:p-6 md:max-w-6xl mx-auto w-full">
      <MonthView
        months={months}
        houses={houses}
        selectedHouseId={selectedHouseId}
      />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Months",
  description: "Manage your house months and configurations",
};

export default MonthsPage;
