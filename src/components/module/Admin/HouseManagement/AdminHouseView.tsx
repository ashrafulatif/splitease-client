"use client";

import { useState } from "react";
import { AdminHouseTable } from "./AdminHouseTable";
import { AdminUpdateHouseDialog } from "./AdminUpdateHouseDialog";
import { AdminDeleteHouseDialog } from "./AdminDeleteHouseDialog";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { IHouse } from "@/types/house.types";

interface AdminHouseViewProps {
  houses: IHouse[];
}

const AdminHouseView = ({ houses = [] }: AdminHouseViewProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHouse, setSelectedHouse] = useState<IHouse | null>(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const onEdit = (house: IHouse) => {
    setSelectedHouse(house);
    setIsUpdateOpen(true);
  };

  const onDelete = (house: IHouse) => {
    setSelectedHouse(house);
    setIsDeleteOpen(true);
  };

  const filteredHouses = houses.filter(house => 
    house.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    house.creator.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    house.creator.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-8 border border-border/50 shadow-sm gap-6 transition-all hover:shadow-md">
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tight text-foreground">
            Infrastructure Governance
          </h2>
          <p className="text-muted-foreground font-medium text-sm max-w-md">
            Oversee housing assets, resident distribution, and financial resource allocation across the platform.
          </p>
        </div>
        
        <div className="relative w-full sm:w-[350px]">
           <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/50">
              <Search className="w-4 h-4" />
           </div>
           <Input 
              placeholder="Search house name or creator..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 rounded-2xl h-12 bg-stone-50/50 border focus-visible:ring-primary/20 text-sm font-bold tracking-tight transition-all focus:bg-white focus:shadow-lg focus:shadow-stone-100"
            />
        </div>
      </div>

      {/* Table Section */}
      <AdminHouseTable 
        houses={filteredHouses} 
        onEdit={onEdit}
        onDelete={onDelete}
      />

      {/* Dialogs */}
      <AdminUpdateHouseDialog 
        open={isUpdateOpen} 
        setOpen={setIsUpdateOpen} 
        house={selectedHouse} 
      />
      <AdminDeleteHouseDialog 
        open={isDeleteOpen} 
        setOpen={setIsDeleteOpen} 
        house={selectedHouse} 
      />
    </div>
  );
};

export default AdminHouseView;
