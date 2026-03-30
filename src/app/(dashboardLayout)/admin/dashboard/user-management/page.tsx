import AdminUserManagementView from "@/components/module/Admin/UserManagement/UserManagementView";
import { UserServices } from "@/service/user.service";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "User Management",
  description: "Manage system users, roles, and access.",
};

const AdminUserManagementPage = async () => {
  const result = await UserServices.getAllUsers();
  const users = result?.data || [];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
      <AdminUserManagementView users={users} />
    </div>
  );
};

export default AdminUserManagementPage;
