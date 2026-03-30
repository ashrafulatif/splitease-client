import MemberView from "@/components/module/Common/MemberComponents/MemberView";
import { Metadata } from "next";
import { getHouseMembersAction } from "./_action";
import { getMyHouseAction } from "../house/_action";

const MembersPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ house?: string }>;
}) => {
  const params = await searchParams;

  const housesRes = await getMyHouseAction();
  const houses = housesRes?.data || [];

  const selectedHouseId = params?.house || houses[0]?.id;

  let members = [];
  if (selectedHouseId) {
    const membersRes = await getHouseMembersAction(selectedHouseId);
    members = membersRes?.data || [];
  }

  return (
    <div className="p-4 md:p-6 md:max-w-6xl mx-auto w-full">
      <MemberView
        members={members}
        houses={houses}
        selectedHouseId={selectedHouseId}
      />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Members",
  description: "Members of house",
};

export default MembersPage;
