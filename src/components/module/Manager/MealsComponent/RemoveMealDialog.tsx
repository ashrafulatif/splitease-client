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
import { deleteMealAction } from "@/app/(dashboardLayout)/manager/dashboard/meals/_action";
import { Loader2 } from "lucide-react";

export const RemoveMealDialog = ({
  open,
  setOpen,
  mealId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  mealId: string;
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRemove = () => {
    startTransition(async () => {
      const result = await deleteMealAction(mealId);
      if (result?.error || result?.message === "Failed" || !result) {
        toast.error(result?.error || result?.message || "Failed to delete meal");
      } else {
        toast.success(result?.message || "Meal deleted successfully");
        setOpen(false);
        router.refresh();
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Meal Entry</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this meal record? This action will adjust house expense calculations and cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleRemove} disabled={isPending} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            {isPending ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Deleting...</> : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
