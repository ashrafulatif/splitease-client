/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { AddMemberModal } from "./AddMemberModal";
import { RemoveMemberDialog } from "./RemoveMemberDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Trash2, Users, ShieldAlert, ShieldCheck } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import PaginationControls from "@/components/ui/pagination-control";

const MemberView = ({ members = [], houses = [], selectedHouseId, meta }: { members?: any[], houses?: any[], selectedHouseId?: string, meta?: any }) => {
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleHouseChange = (newHouseId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("house", newHouseId);
    router.push(`${pathname}?${params.toString()}`);
  };

  const onRemove = (member: any) => {
    setSelectedMember(member);
    setIsRemoveOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden flex flex-col sm:flex-row justify-between items-start sm:items-center bg-card p-6 rounded-xl border-b shadow-sm gap-4">
        {/* Minimalist half-circle background */}
        <div className="absolute -left-24 top-1/2 -translate-y-1/2 w-140 h-140 bg-gradient-to-r from-primary/10 to-transparent rounded-full pointer-events-none"></div>

        <div className="relative z-10 pl-4 border-l-4 border-primary rounded-l-sm">
          <h2 className="text-2xl font-bold tracking-tight">Members Overview</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage your house members, their roles, and access.
          </p>
        </div>
        <div className="relative z-10 flex flex-wrap items-center gap-3">
          {houses.length > 0 && (
              <Select 
                value={selectedHouseId} 
                onValueChange={handleHouseChange}
              >
              <SelectTrigger className="w-[200px] h-10">
                  <SelectValue placeholder="Select a house" />
                </SelectTrigger>
                <SelectContent>
                  {houses.map((house: any) => (
                    <SelectItem key={house.id || house._id} value={house.id || house._id}>
                    {house.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
          )}
            <AddMemberModal houses={houses} />
          </div>
        </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[300px] pl-6">User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>House</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px] text-right pr-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-48 text-muted-foreground">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="rounded-full bg-muted p-3">
                      <Users className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <span>No members found. Click &apos;Add Member&apos; to invite someone.</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              members.map((member: any) => (
                <TableRow key={member.id || member._id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="pl-6">
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-base">{member.user?.name || 'Unknown'}</span>
                      <span className="text-sm text-muted-foreground">{member.user?.email}</span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    {member.role === "MANAGER" ? (
                      <Badge variant="secondary" className="bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 font-normal flex w-fit items-center gap-1">
                        <ShieldAlert className="w-3 h-3" />
                        Manager
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-normal flex w-fit items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        Member
                      </Badge>
                    )}
                  </TableCell>

                  <TableCell>
                    <span className="text-sm font-medium">{member.house?.name || 'N/A'}</span>
                  </TableCell>
                  
                  <TableCell>
                     {member.user?.status === "ACTIVE" ? (
                       <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50 dark:bg-emerald-500/10 dark:border-emerald-500/20 font-normal">Active</Badge>
                     ) : (
                       <Badge variant="outline" className="text-muted-foreground font-normal">{member.user?.status || 'Pending'}</Badge>
                     )}
                  </TableCell>

                  <TableCell className="text-right pr-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-muted">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive cursor-pointer"
                          onClick={() => onRemove(member)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove
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

      {meta && meta.total > 0 && (
        <PaginationControls meta={meta} />
      )}

      {selectedMember && (
        <RemoveMemberDialog
          open={isRemoveOpen}
          setOpen={setIsRemoveOpen}
          memberId={selectedMember.id || selectedMember._id}
          memberName={selectedMember.user?.name || "this user"}
        />
      )}
    </div>
  );
}

export default MemberView;