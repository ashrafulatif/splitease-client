"use client";

import { useState } from "react";
import { ReceiptText } from "lucide-react";
import { IHouse } from "@/types/house.types";
import { IMonth } from "@/types/month.types";
import { IExpense } from "@/types/expense.types";
import { ExpenseFilters } from "./ExpenseFilters";
import { ExpenseStats } from "./ExpenseStats";
import { ExpenseCard } from "./ExpenseCard";
import { AddExpenseModal } from "./AddExpenseModal";
import { UpdateExpenseModal } from "./UpdateExpenseModal";
import { RemoveExpenseDialog } from "./RemoveExpenseDialog";
import { UserRole } from "@/lib/authUtils";

interface ExpensesViewProps {
  expenses: IExpense[];
  houses: IHouse[];
  months: IMonth[];
  selectedHouseId?: string;
  selectedMonthId?: string;
  currentUserRole?: UserRole;
}

const ExpensesView = ({
  expenses = [],
  houses = [],
  months = [],
  selectedHouseId,
  selectedMonthId,
  currentUserRole,
}: ExpensesViewProps) => {
  const [selectedExpense, setSelectedExpense] = useState<IExpense | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);

  const onEdit = (expense: IExpense) => {
    setSelectedExpense(expense);
    setIsEditOpen(true);
  };

  const onDelete = (expense: IExpense) => {
    setSelectedExpense(expense);
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
              House Expenses
            </h2>
            <p className="text-muted-foreground mt-1 text-sm font-medium">
              Manage utilities, rent, and overheads for this month.
            </p>
          </div>
          {currentUserRole !== "MEMBER" && (
            <AddExpenseModal
              open={isAddOpen}
              setOpen={setIsAddOpen}
              houses={houses}
              months={months}
              defaultHouseId={selectedHouseId}
              defaultMonthId={selectedMonthId}
            />
          )}
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8 relative z-10">
          <ExpenseFilters
            houses={houses}
            months={months}
            selectedHouseId={selectedHouseId}
            selectedMonthId={selectedMonthId}
          />
          <ExpenseStats expenses={expenses} />
        </div>
      </div>

      {/* Grid view showing Expenses */}
      {expenses.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-card rounded-3xl border border-dashed shadow-sm">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <ReceiptText className="w-8 h-8 text-muted-foreground/50" />
          </div>
          <h3 className="text-lg font-bold">No expenses found</h3>
          <p className="text-muted-foreground text-sm max-w-sm text-center mt-1">
            There are no expense records for the selected month. Click &quot;Record
            Expense&quot; to add your first entry.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expenses.map((expense) => (
            <ExpenseCard
              key={expense.id}
              expense={expense}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}

      {selectedExpense && (
        <UpdateExpenseModal
          open={isEditOpen}
          setOpen={setIsEditOpen}
          expense={selectedExpense}
          houses={houses}
          months={months}
        />
      )}

      {selectedExpense && (
        <RemoveExpenseDialog
          open={isRemoveOpen}
          setOpen={setIsRemoveOpen}
          expenseId={selectedExpense.id}
        />
      )}
    </div>
  );
};

export default ExpensesView;
