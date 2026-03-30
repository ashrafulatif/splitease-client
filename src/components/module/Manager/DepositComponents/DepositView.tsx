"use client";

import { useState } from "react";
import { Plus, PiggyBank, Search } from "lucide-react";
import { IHouse } from "@/types/house.types";
import { IMonth } from "@/types/month.types";
import { IDeposit } from "@/types/deposits.types";
import { DepositFilters } from "./DepositFilters";
import { DepositStats } from "./DepositStats";
import { UserDepositCard } from "./UserDepositCard";
import { AddDepositModal } from "./AddDepositModal";
import { UpdateDepositModal } from "./UpdateDepositModal";
import { RemoveDepositDialog } from "./RemoveDepositDialog";
import { UserRole } from "@/lib/authUtils";

interface DepositViewProps {
  deposits: IDeposit[];
  houses: IHouse[];
  months: IMonth[];
  members: any[];
  selectedHouseId?: string;
  selectedMonthId?: string;
  currentUserRole?: UserRole;
}

export const DepositView = ({
  deposits = [],
  houses = [],
  months = [],
  members = [],
  selectedHouseId,
  selectedMonthId,
  currentUserRole,
}: DepositViewProps) => {
  const [selectedDeposit, setSelectedDeposit] = useState<IDeposit | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);

  // Grouping deposits by user
  const groupedDepositsByUser = deposits.reduce((acc: any, deposit) => {
    const userId = deposit.userId;
    if (!acc[userId]) {
      acc[userId] = {
        user: deposit.user,
        deposits: [],
      };
    }
    acc[userId].deposits.push(deposit);
    return acc;
  }, {});

  const usersWithDeposits = Object.values(groupedDepositsByUser);

  const onEdit = (deposit: IDeposit) => {
    setSelectedDeposit(deposit);
    setIsEditOpen(true);
  };

  const onDelete = (deposit: IDeposit) => {
    setSelectedDeposit(deposit);
    setIsRemoveOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Dashboard Header Block */}
      <div className="relative overflow-hidden flex flex-col items-start bg-card rounded-3xl border shadow-sm">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full flex justify-between items-center p-6 sm:p-8 border-b bg-muted/20 z-10">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Monthly Deposits
            </h2>
            <p className="text-muted-foreground mt-1 text-sm font-medium">
              Track member contributions and funds.
            </p>
          </div>
          {currentUserRole !== "MEMBER" && (
            <AddDepositModal
              open={isAddOpen}
              setOpen={setIsAddOpen}
              houses={houses}
              months={months}
              members={members}
              defaultHouseId={selectedHouseId}
              defaultMonthId={selectedMonthId}
            />
          )}
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8 relative z-10">
          <DepositFilters
            houses={houses}
            months={months}
            selectedHouseId={selectedHouseId}
            selectedMonthId={selectedMonthId}
          />
          <DepositStats deposits={deposits} />
        </div>
      </div>

      {/* Grid view grouping Deposits by User */}
      {deposits.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-card rounded-3xl border border-dashed shadow-sm">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <PiggyBank className="w-8 h-8 text-muted-foreground/50" />
          </div>
          <h3 className="text-lg font-bold">No deposits yet</h3>
          <p className="text-muted-foreground text-sm max-w-sm text-center mt-1">
            There are no deposit records for the selected month. Click "Log
            Deposit" to add your first entry.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {usersWithDeposits.map((userData: any, index: number) => (
            <UserDepositCard
              key={userData.user.id}
              user={userData.user}
              deposits={userData.deposits}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}

      {selectedDeposit && (
        <UpdateDepositModal
          open={isEditOpen}
          setOpen={setIsEditOpen}
          deposit={selectedDeposit}
          houses={houses}
          months={months}
          members={members}
        />
      )}

      {selectedDeposit && (
        <RemoveDepositDialog
          open={isRemoveOpen}
          setOpen={setIsRemoveOpen}
          depositId={selectedDeposit.id}
        />
      )}
    </div>
  );
};
