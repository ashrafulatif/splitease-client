/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { UserTable } from "./UserTable";
import { UpdateUserStatusDialog } from "./UpdateUserStatusDialog";
import { DeleteUserDialog } from "./DeleteUserDialog";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { UserInfo } from "@/types/user.type";

interface UserManagementViewProps {
  users: (UserInfo & { status: string; profileImage?: string; isDeleted?: boolean })[];
}

const AdminUserManagementView = ({ users = [] }: UserManagementViewProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onStatusToggle = (user: any) => {
    setSelectedUser(user);
    setIsStatusOpen(true);
  };

  const onDelete = (user: any) => {
    setSelectedUser(user);
    setIsDeleteOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-8 border border-border/50 shadow-sm gap-6 transition-all hover:shadow-md">
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tight text-foreground">
            Identity Management
          </h2>
          <p className="text-muted-foreground font-medium text-sm max-w-md">
            Audit and regulate user accounts, access permissions, and roles within the platform environment.
          </p>
        </div>
        
        <div className="relative w-full sm:w-[350px]">
           <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/50">
              <Search className="w-4 h-4" />
           </div>
           <Input 
              placeholder="Search by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 rounded-2xl h-12 bg-stone-50/50 border focus-visible:ring-primary/20 text-sm font-bold tracking-tight transition-all focus:bg-white focus:shadow-lg focus:shadow-stone-100"
            />
        </div>
      </div>

      {/* Table Section */}
      <UserTable 
        users={filteredUsers} 
        onStatusToggle={onStatusToggle}
        onDelete={onDelete}
      />

      {/* Dialogs */}
      {selectedUser && (
        <>
          <UpdateUserStatusDialog 
            open={isStatusOpen} 
            setOpen={setIsStatusOpen} 
            user={selectedUser} 
          />
          <DeleteUserDialog 
            open={isDeleteOpen} 
            setOpen={setIsDeleteOpen} 
            user={selectedUser} 
          />
        </>
      )}
    </div>
  );
};

export default AdminUserManagementView;
