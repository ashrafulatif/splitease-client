/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { CreateHouseModal } from "./CreateHouseModal";
import { UpdateHouseModal } from "./UpdateHouseModal";
import { DeleteHouseDialog } from "./DeleteHouseDialog";
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
import {
  MoreHorizontal,
  Edit,
  Trash2,
  Home,
  Users,
  Calendar,
  Banknote,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const HouseView = ({ houses = [] }: { houses?: any[] }) => {
  const [selectedHouse, setSelectedHouse] = useState<any>(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const onEdit = (house: any) => {
    setSelectedHouse(house);
    setIsUpdateOpen(true);
  };

  const onDelete = (house: any) => {
    setSelectedHouse(house);
    setIsDeleteOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-card p-6 rounded-xl border shadow-sm gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Houses Overview</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage your houses, members, and related activities.
          </p>
        </div>
        <CreateHouseModal />
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-70 pl-6">House</TableHead>
              <TableHead>Overview</TableHead>
              <TableHead>Creator</TableHead>
              <TableHead className="w-25 text-right pr-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {houses.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center h-48 text-muted-foreground"
                >
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="rounded-full bg-muted p-3">
                      <Home className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <span>
                      No houses found. Click &quot;Add House&quot; to create
                      one.
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              houses.map((house: any) => (
                <TableRow
                  key={house.id || house._id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="pl-6">
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-base">
                        {house.name}
                      </span>
                      {house.description && (
                        <span className="text-sm text-muted-foreground line-clamp-2">
                          {house.description}
                        </span>
                      )}
                      {!house.description && (
                        <span className="text-sm text-muted-foreground/60 italic">
                          No description
                        </span>
                      )}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1 font-normal bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      >
                        <Users className="w-3 h-3" />
                        {house._count?.members || 0} Members
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1 font-normal bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                      >
                        <Calendar className="w-3 h-3" />
                        {house._count?.months || 0} Months
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1 font-normal bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                      >
                        <Banknote className="w-3 h-3" />
                        {house._count?.expenses || 0} Expenses
                      </Badge>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {house.creator?.name || "Unknown"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {house.creator?.email}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="text-right pr-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0 hover:bg-muted"
                        >
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem
                          onClick={() => onEdit(house)}
                          className="cursor-pointer"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive cursor-pointer"
                          onClick={() => onDelete(house)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
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

      {selectedHouse && (
        <>
          <UpdateHouseModal
            open={isUpdateOpen}
            setOpen={setIsUpdateOpen}
            house={selectedHouse}
          />
          <DeleteHouseDialog
            open={isDeleteOpen}
            setOpen={setIsDeleteOpen}
            houseId={selectedHouse.id || selectedHouse._id}
          />
        </>
      )}
    </div>
  );
};

export default HouseView;
