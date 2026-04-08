import MemberView from "@/components/module/Common/MemberComponents/MemberView";
import { Metadata } from "next";
import { getHouseMembersAction } from "./_action";
import { getMyHouseAction } from "../house/_action";

const MembersPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  
  const houseIdParam = typeof params?.house === "string" ? params.house : undefined;
  const page = typeof params?.page === "string" ? parseInt(params.page) : 1;
  const limit = 10;

  const housesRes = await getMyHouseAction();
  const houses = housesRes?.data || [];

  const selectedHouseId = houseIdParam || houses[0]?.id;

  let members = [];
  let meta = null;
  if (selectedHouseId) {
    const membersRes = await getHouseMembersAction(selectedHouseId, { page, limit });
    members = membersRes?.data || [];
    meta = membersRes?.meta;
  }

  return (
    <div className="p-4 md:p-6 md:max-w-6xl mx-auto w-full">
      <MemberView
        members={members}
        houses={houses}
        selectedHouseId={selectedHouseId}
        meta={meta}
      />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Members",
  description: "Members of house",
};

export default MembersPage;
