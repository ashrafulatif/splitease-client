/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { deleteUserAction } from "@/app/(dashboardLayout)/admin/dashboard/user-management/_action";

interface DeleteUserDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  user: any;
}

export const DeleteUserDialog = ({
  open,
  setOpen,
  user,
}: DeleteUserDialogProps) => {
  const [isPending, startTransition] = useTransition();

  if (!user) return null;

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const res = await deleteUserAction(user.id);

        if (!res.success) {
          toast.error(res.message);
          return;
        }

        toast.success(res.message);
        setOpen(false);
      } catch (error) {
        toast.error("An unexpected error occurred");
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the user
            account for <span className="font-bold text-foreground">{user.name}</span> and remove all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete} 
            disabled={isPending}
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
          >
            {isPending ? "Deleting..." : "Permanently Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
