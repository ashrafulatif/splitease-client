"use client";

import { toast } from "sonner";
import { AlertCircle } from "lucide-react";
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
import { deletePlanAction } from "@/app/(dashboardLayout)/admin/dashboard/plans/_action";

interface DeletePlanDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  planId: string;
}

export const DeletePlanDialog = ({
  open,
  setOpen,
  planId,
}: DeletePlanDialogProps) => {
  const handleDelete = async () => {
    const toastId = toast.loading("Deleting plan...");
    try {
      const res = await deletePlanAction(planId);

      if (!res.success) {
        toast.error(res.message, { id: toastId });
        return;
      }

      toast.success(res.message, { id: toastId });
      setOpen(false);
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="rounded-3xl p-8 border-none shadow-2xl">
        <AlertDialogHeader className="mb-4">
          <div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center mb-4 text-destructive">
            <AlertCircle className="h-6 w-6" />
          </div>
          <AlertDialogTitle className="text-2xl font-black tracking-tight text-foreground">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="font-medium text-muted-foreground pt-1">
            This action cannot be undone. This will permanently delete the subscription plan from the system.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel className="rounded-xl font-bold bg-stone-100 border-none hover:bg-stone-200 text-foreground transition-all">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            className="rounded-xl font-bold bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg shadow-destructive/20 transition-all font-black uppercase tracking-widest"
          >
            Delete Plan
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
