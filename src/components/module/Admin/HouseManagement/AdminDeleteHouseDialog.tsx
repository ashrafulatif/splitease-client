"use client";

import { useTransition } from "react";
import { toast } from "sonner";
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
import { deleteHouseAction } from "@/app/(dashboardLayout)/admin/dashboard/house-management/_action";
import { IHouse } from "@/types/house.types";

interface AdminDeleteHouseDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  house: IHouse | null;
}

export const AdminDeleteHouseDialog = ({
  open,
  setOpen,
  house,
}: AdminDeleteHouseDialogProps) => {
  const [isPending, startTransition] = useTransition();

  if (!house) return null;

  const handleDelete = () => {
    startTransition(async () => {
      const toastId = toast.loading(`Decommissioning ${house.name}...`);
      try {
        const res = await deleteHouseAction(house.id);

        if (!res.success) {
          toast.error(res.message, { id: toastId });
          return;
        }

        toast.success(res.message, { id: toastId });
        setOpen(false);
      } catch (error) {
        toast.error("An unexpected error occurred", { id: toastId });
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the house
            <span className="font-bold text-foreground"> {house.name}</span> and remove all associated infrastructure, residents, and financial data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete} 
            disabled={isPending}
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
          >
            {isPending ? "Decommissioning..." : "Permanently Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
