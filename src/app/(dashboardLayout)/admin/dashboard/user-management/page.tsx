import AdminUserManagementView from "@/components/module/Admin/UserManagement/UserManagementView";
import { UserServices } from "@/service/user.service";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "User Management",
  description: "Manage system users, roles, and access.",
};

const AdminUserManagementPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  const params = await searchParams;
  
  const result = await UserServices.getAllUsers(params);
  const users = result?.data || [];
  const meta = result?.meta;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
      <AdminUserManagementView users={users} meta={meta} />
    </div>
  );
};

export default AdminUserManagementPage;
