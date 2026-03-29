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
import { deleteDepositAction } from "@/app/(dashboardLayout)/manager/dashboard/deposits/_action";

interface RemoveDepositDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  depositId: string;
}

export const RemoveDepositDialog = ({
  open,
  setOpen,
  depositId,
}: RemoveDepositDialogProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      const result = await deleteDepositAction(depositId);
      if (result?.error || result?.message === "Failed" || !result) {
        toast.error(result?.error || result?.message || "Failed to delete deposit");
      } else {
        toast.success(result?.message || "Deposit entry removed");
        setOpen(false);
        router.refresh();
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="rounded-3xl max-w-md p-8 border shadow-2xl">
        <AlertDialogHeader className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
            <Trash2 className="w-8 h-8 text-destructive animate-in zoom-in duration-300" />
          </div>
          <AlertDialogTitle className="text-2xl font-extrabold tracking-tight">Delete Record?</AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground font-medium text-md mt-2">
            This action will permanently remove this deposit record from the house registry. This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-xl border border-dashed border-muted-foreground/20 mt-4 mb-6">
           <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
           <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Warning: Data stability affected</p>
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
            className="w-full sm:w-1/2 rounded-xl h-12 font-bold bg-destructive hover:bg-destructive/90 shadow-lg shadow-destructive/20 transition-all"
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
