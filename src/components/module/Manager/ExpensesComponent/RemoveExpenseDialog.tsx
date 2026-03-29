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
        toast.error(result?.error || result?.message || "Failed to remove expense");
      } else {
        toast.success(result?.message || "Expense record removed");
        setOpen(false);
        router.refresh();
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="rounded-3xl max-w-sm p-8 border shadow-2xl">
        <AlertDialogHeader className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
            <Trash2 className="w-8 h-8 text-destructive animate-in zoom-in duration-300" />
          </div>
          <AlertDialogTitle className="text-2xl font-extrabold tracking-tight">Delete Expense?</AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground font-medium text-md mt-2 leading-relaxed">
            This will permanently remove the expense record from this month.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex items-center gap-2 p-3 bg-muted/60 rounded-2xl border border-dashed border-muted-foreground/20 mt-4 mb-8">
           <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
           <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">Warning: Irreversible deletion</p>
        </div>
        <AlertDialogFooter className="flex-col sm:flex-row gap-3">
          <AlertDialogCancel className="w-full sm:w-1/2 rounded-xl h-12 font-bold bg-muted hover:bg-muted/80 border-none transition-all">
            Keep Record
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            className="w-full sm:w-1/2 rounded-xl h-12 font-bold bg-destructive hover:bg-destructive/90 shadow-lg shadow-destructive/20 transition-all border-none"
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
