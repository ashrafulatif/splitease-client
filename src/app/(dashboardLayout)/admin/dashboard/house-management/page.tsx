import AdminHouseView from "@/components/module/Admin/HouseManagement/AdminHouseView";

import { HouseServices } from "@/service/manager-service/house.service";

const AdminHouseManagement = async () => {
  const { data: houses = [] } = await HouseServices.getAllHouses();

  return (
    <div className="container mx-auto py-8 px-4">
      <AdminHouseView houses={houses} />
    </div>
  );
};

export default AdminHouseManagement;
