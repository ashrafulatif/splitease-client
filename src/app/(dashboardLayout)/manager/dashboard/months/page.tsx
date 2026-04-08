import MonthView from "@/components/module/Common/MonthComponent/MonthView";
import { Metadata } from "next";
import { getHouseMonthsAction } from "./_action";
import { getMyHouseAction } from "../house/_action";

const MonthsPage = async (props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParams = await props.searchParams;

  const houseIdParam = typeof searchParams?.house === "string" ? searchParams.house : undefined;
  const page = typeof searchParams?.page === "string" ? parseInt(searchParams.page) : 1;
  const limit = 10;

  const housesRes = await getMyHouseAction();
  const houses = housesRes?.data || [];

  const selectedHouseId = houseIdParam || houses[0]?.id;

  let months = [];
  let meta = null;
  if (selectedHouseId) {
    const monthsRes = await getHouseMonthsAction(selectedHouseId, { page, limit });
    months = monthsRes?.data || [];
    meta = monthsRes?.meta;
  }

  return (
    <div className="p-4 md:p-6 md:max-w-6xl mx-auto w-full">
      <MonthView
        months={months}
        houses={houses}
        selectedHouseId={selectedHouseId}
        meta={meta}
      />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Months",
  description: "Manage your house months and configurations",
};

export default MonthsPage;
