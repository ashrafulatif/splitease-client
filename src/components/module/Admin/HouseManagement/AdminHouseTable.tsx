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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IHouse } from "@/types/house.types";
import { format } from "date-fns";
import { Users, Utensils, Wallet, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface AdminHouseTableProps {
  houses: IHouse[];
  onEdit: (house: IHouse) => void;
  onDelete: (house: IHouse) => void;
}

export const AdminHouseTable = ({ houses = [], onEdit, onDelete }: AdminHouseTableProps) => {
  return (
    <div className="rounded-3xl border border-border/50 bg-white shadow-sm overflow-hidden transition-all hover:shadow-md">
      <Table>
        <TableHeader className="bg-stone-50/50">
          <TableRow className="hover:bg-transparent border-border/50">
            <TableHead className="w-[300px] pl-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">House Identity</TableHead>
            <TableHead className="py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">Creator</TableHead>
            <TableHead className="py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 text-center">Resources</TableHead>
            <TableHead className="py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 underline underline-offset-4 decoration-border/50">Audit Details</TableHead>
            <TableHead className="w-[120px] text-right pr-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {houses.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center h-64 text-muted-foreground font-bold opacity-50 uppercase tracking-[0.2em] text-xs">
                No platform houses found
              </TableCell>
            </TableRow>
          ) : (
            houses.map((house) => (
              <TableRow key={house.id} className="hover:bg-stone-50/50 border-border/40 transition-colors group">
                <TableCell className="pl-8 py-6">
                  <div className="space-y-1">
                    <h4 className="text-base font-black tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {house.name}
                    </h4>
                    <p className="text-xs font-bold text-muted-foreground/60 leading-relaxed max-w-[220px] truncate">
                      {house.description || "No description provided"}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="py-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10 rounded-full border-2 border-stone-50 overflow-hidden shadow-sm shadow-stone-100 transition-transform group-hover:scale-105">
                      <AvatarImage src={house.creator.image} />
                      <AvatarFallback className="bg-stone-100 text-stone-400 font-bold">
                        {house.creator.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-black text-foreground tracking-tight">{house.creator.name}</p>
                      <p className="text-[10px] font-bold text-muted-foreground/60 tracking-tight">
                        {house.creator.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-6 px-6">
                  <div className="flex items-center justify-center gap-3">
                    <ResourceBadge icon={Users} count={house._count.members} label="Members" color="text-indigo-600" bg="bg-indigo-50" />
                    <ResourceBadge icon={Utensils} count={house._count.meals} label="Meals" color="text-emerald-600" bg="bg-emerald-50" />
                    <ResourceBadge icon={Wallet} count={house._count.expenses} label="Expenses" color="text-rose-600" bg="bg-rose-50" />
                  </div>
                </TableCell>
                <TableCell className="py-6 px-6">
                  <div className="space-y-1">
                    <p className="text-xs font-black text-foreground tracking-tight">
                      {format(new Date(house.createdAt), "MMM dd, yyyy")}
                    </p>
                    <p className="text-[10px] font-bold text-muted-foreground/60 uppercase">
                       {format(new Date(house.createdAt), "hh:mm a")}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="py-6 text-right pr-6">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-10 w-10 p-0 hover:bg-stone-100 rounded-xl transition-all">
                        <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[180px] rounded-2xl p-2 border-border/50 shadow-xl">
                      <DropdownMenuItem 
                        onClick={() => onEdit(house)}
                        className="cursor-pointer rounded-xl font-bold py-2.5 focus:bg-stone-50"
                      >
                        <Edit className="mr-2.5 h-4 w-4 text-primary" />
                        Modify Unit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive cursor-pointer rounded-xl font-bold py-2.5 focus:bg-destructive/5"
                        onClick={() => onDelete(house)}
                      >
                        <Trash2 className="mr-2.5 h-4 w-4" />
                        Decommission
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

const ResourceBadge = ({ icon: Icon, count, label, color, bg }: any) => (
  <div className={`flex flex-col items-center gap-1 min-w-[50px] group/item`}>
    <div className={`p-1.5 rounded-xl ${bg} ${color} transition-transform group-hover/item:scale-110`}>
      <Icon className="w-3.5 h-3.5" />
    </div>
    <span className="text-[11px] font-black tracking-tight text-foreground">{count}</span>
    <span className="text-[8px] font-bold text-muted-foreground uppercase opacity-40">{label}</span>
  </div>
);
