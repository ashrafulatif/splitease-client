import HouseView from "@/components/module/Manager/HouseComponents/HouseView";
import { Metadata } from "next";
import { getMyHouseAction } from "./_action";

const HousePage = async () => {
  const result = await getMyHouseAction();
  const houses = result?.data || [];

  return (
    <div className="p-4 md:p-6 md:max-w-6xl mx-auto w-full">
      <HouseView houses={houses} />
    </div>
  );
};

export const metadata: Metadata = {
  title: "House",
  description: "Manage your house details and settings",
};

export default HousePage;
