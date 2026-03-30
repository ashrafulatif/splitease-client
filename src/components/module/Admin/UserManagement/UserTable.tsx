/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2,  UserCheck, UserX } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserInfo } from "@/types/user.type";
import { getRoleBadge, getStatusBadge } from "./helpers/userManagementHelpers";

interface UserTableProps {
  users: (UserInfo & { status: string; profileImage?: string; isDeleted?: boolean })[];
  onStatusToggle: (user: any) => void;
  onDelete: (user: any) => void;
}



export const UserTable = ({ users = [], onStatusToggle, onDelete }: UserTableProps) => {
  return (
    <div className="rounded-3xl border border-border/50 bg-white shadow-sm overflow-hidden transition-all hover:shadow-md">
      <Table>
        <TableHeader className="bg-stone-50/50">
          <TableRow className="hover:bg-transparent border-border/50">
            <TableHead className="w-[300px] pl-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">User Details</TableHead>
            <TableHead className="py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 text-center">Security Role</TableHead>
            <TableHead className="py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 text-center">Status</TableHead>
            <TableHead className="w-[100px] text-right pr-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center h-64 text-muted-foreground font-bold opacity-50 uppercase tracking-[0.2em] text-xs">
                No users found in the system
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id} className="hover:bg-stone-50/50 transition-colors border-border/40 group">
                <TableCell className="pl-8 py-2">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12 rounded-full border-2 border-stone-50 overflow-hidden shadow-sm shadow-stone-100 transition-transform group-hover:scale-105 duration-300">
                      <AvatarImage src={user.profileImage} alt={user.name} />
                      <AvatarFallback className="bg-stone-100 text-stone-400 font-bold">
                        {user.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-black text-base tracking-tight text-foreground group-hover:text-primary transition-colors">{user.name}</span>
                      <span className="text-xs font-bold text-muted-foreground opacity-60 truncate max-w-[180px]">{user.email}</span>
                    </div>
                  </div>
                </TableCell>
                
                <TableCell className="text-center py-6">
                  <div className="flex justify-center">
                    {getRoleBadge(user.role)}
                  </div>
                </TableCell>

                <TableCell className="text-center py-6">
                   <div className="flex justify-center">
                    {getStatusBadge(user.status)}
                   </div>
                </TableCell>

                <TableCell className="text-right pr-8 py-6">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-10 w-10 p-0 hover:bg-stone-100 rounded-xl transition-all">
                        <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px] rounded-2xl p-2 border-border/50 shadow-xl">
                      <DropdownMenuItem 
                        onClick={() => onStatusToggle(user)}
                        className="cursor-pointer rounded-xl font-bold py-2.5 focus:bg-stone-50"
                      >
                        {user.status === "ACTIVE" ? (
                          <>
                            <UserX className="mr-2.5 h-4 w-4 text-destructive" />
                            Block Access
                          </>
                        ) : (
                          <>
                            <UserCheck className="mr-2.5 h-4 w-4 text-emerald-600" />
                            Unblock Access
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive cursor-pointer rounded-xl font-bold py-2.5 focus:bg-destructive/5"
                        onClick={() => onDelete(user)}
                      >
                        <Trash2 className="mr-2.5 h-4 w-4" />
                        Permanently Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
