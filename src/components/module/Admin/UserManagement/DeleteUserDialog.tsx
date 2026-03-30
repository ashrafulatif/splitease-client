"use client";

import { toast } from "sonner";
import { Trash2, AlertTriangle, Info } from "lucide-react";
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
  if (!user) return null;

  const handleDelete = async () => {
    const toastId = toast.loading(`Permanently deleting ${user.name}...`);
    try {
      const res = await deleteUserAction(user.id);

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
      <AlertDialogContent className="rounded-3xl p-8 border-none shadow-2xl overflow-hidden">
        {/* Progress indicator border */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-destructive rounded-t-full" />
        
        <AlertDialogHeader className="mb-6">
          <div className="w-16 h-16 rounded-[22px] bg-destructive/10 flex items-center justify-center mb-6 text-destructive animate-pulse">
            <Trash2 className="h-8 w-8" />
          </div>
          <AlertDialogTitle className="text-3xl font-black tracking-tighter text-foreground leading-none">
            Irreversible Operation
          </AlertDialogTitle>
          <AlertDialogDescription className="font-bold text-muted-foreground pt-4 text-base leading-relaxed bg-stone-50 rounded-2xl p-6 border border-stone-100 flex items-start gap-4">
             <div className="bg-destructive/10 text-destructive p-1 rounded-lg shrink-0 mt-0.5">
                <AlertTriangle className="h-4 w-4" />
             </div>
             <div>
                Warning: You are about to permanently delete <span className="text-foreground underline decoration-destructive/30 decoration-2 underline-offset-2">{user.name}</span>'s account. This action will remove all history, subscriptions, and data associated with this user.
             </div>
          </AlertDialogDescription>
           <div className="flex items-center gap-2 mt-4 px-2 text-[10px] uppercase font-black tracking-widest text-muted-foreground opacity-50">
             <Info className="w-4 h-4" />
             This action cannot be undone
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-3 sm:gap-4 mt-4">
          <AlertDialogCancel className="rounded-xl font-bold bg-white border-2 border-stone-100 hover:bg-stone-50 hover:border-stone-200 text-stone-600 transition-all px-8 h-12">
            Abort Action
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            className="rounded-xl font-black bg-destructive hover:bg-red-600 text-white shadow-xl shadow-destructive/20 active:scale-95 transition-all uppercase tracking-widest px-10 h-12"
          >
            Confirm Deletion
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
