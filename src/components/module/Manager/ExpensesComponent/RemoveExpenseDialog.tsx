"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2, Trash2, AlertTriangle } from "lucide-react";
import { deleteExpenseAction } from "@/app/(dashboardLayout)/manager/dashboard/expenses/_action";

interface RemoveExpenseDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  expenseId: string;
}

export const RemoveExpenseDialog = ({
  open,
  setOpen,
  expenseId,
}: RemoveExpenseDialogProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      const result = await deleteExpenseAction(expenseId);
      if (result?.error || result?.message === "Failed" || !result) {
        toast.error(
          result?.error || result?.message || "Failed to remove expense",
        );
      } else {
        toast.success(result?.message || "Expense record removed");
        setOpen(false);
        router.refresh();
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="max-w-sm p-6 sm:p-7">
        <AlertDialogHeader className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
            <Trash2 className="w-7 h-7 text-destructive" />
          </div>
          <AlertDialogTitle className="text-xl font-semibold tracking-tight">
            Delete Expense?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground mt-2 text-sm leading-relaxed">
            This will permanently remove the expense record from this month.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex items-center gap-2 p-3 bg-muted rounded-xl border border-dashed mt-4 mb-6">
          <AlertTriangle className="w-4 h-4 text-destructive shrink-0" />
          <p className="text-xs font-medium text-muted-foreground">
            This action is irreversible.
          </p>
        </div>
        <AlertDialogFooter className="flex-col sm:flex-row gap-3">
          <AlertDialogCancel className="w-full sm:w-1/2 rounded-xl h-11 font-medium bg-muted hover:bg-muted/80 border border-border">
            Keep Record
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            className="w-full sm:w-1/2 rounded-xl h-11 font-medium bg-destructive hover:bg-destructive/90"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Yes, Delete Record"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
