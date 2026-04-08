import AdminHouseView from "@/components/module/Admin/HouseManagement/AdminHouseView";

import { HouseServices } from "@/service/house.service";

const AdminHouseManagement = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  const params = await searchParams;

  const result = await HouseServices.getAllHouses(params);
  const houses = result?.data || [];
  const meta = result?.meta;

  return (
    <div className="container mx-auto py-8 px-4">
      <AdminHouseView houses={houses} meta={meta} />
    </div>
  );
};

export default AdminHouseManagement;
