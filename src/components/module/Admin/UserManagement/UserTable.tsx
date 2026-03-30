"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2, ShieldCheck, UserCheck, UserX, ShieldQuestion } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserInfo } from "@/types/user.type";

interface UserTableProps {
  users: (UserInfo & { status: string; profileImage?: string; isDeleted?: boolean })[];
  onStatusToggle: (user: any) => void;
  onDelete: (user: any) => void;
}

const getRoleBadge = (role: string) => {
  switch (role) {
    case "ADMIN":
      return <Badge className="bg-red-50 text-red-600 border-none font-black text-[10px] tracking-widest rounded-lg flex items-center gap-1.5 px-2.5 py-1 uppercase"><ShieldCheck className="w-3 h-3" /> ADMIN</Badge>;
    case "MANAGER":
      return <Badge className="bg-indigo-50 text-indigo-600 border-none font-black text-[10px] tracking-widest rounded-lg flex items-center gap-1.5 px-2.5 py-1 uppercase"><UserCheck className="w-3 h-3" /> MANAGER</Badge>;
    case "MEMBER":
      return <Badge className="bg-stone-50 text-stone-600 border-stone-100 font-black text-[10px] tracking-widest rounded-lg flex items-center gap-1.5 px-2.5 py-1 uppercase border"><UserCheck className="w-3 h-3" /> MEMBER</Badge>;
    default:
      return <Badge variant="outline" className="font-black text-[10px] tracking-widest rounded-lg px-2.5 py-1 uppercase"><ShieldQuestion className="w-3 h-3 mr-1.5" />{role}</Badge>;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "ACTIVE":
      return <Badge className="bg-emerald-500/10 text-emerald-600 border-none font-black text-[9px] tracking-tighter rounded-full px-2.5">ACTIVE</Badge>;
    case "BLOCKED":
      return <Badge className="bg-destructive/10 text-destructive border-none font-black text-[9px] tracking-tighter rounded-full px-2.5">BLOCKED</Badge>;
    default:
      return <Badge variant="outline" className="font-black text-[9px] tracking-tighter rounded-full px-2.5">{status}</Badge>;
  }
};

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
