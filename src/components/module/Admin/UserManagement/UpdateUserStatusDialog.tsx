"use client";

import { toast } from "sonner";
import { UserX, UserCheck, AlertCircle } from "lucide-react";
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
import { updateUserStatusAction } from "@/app/(dashboardLayout)/admin/dashboard/user-management/_action";

interface UpdateUserStatusDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  user: any;
}

export const UpdateUserStatusDialog = ({
  open,
  setOpen,
  user,
}: UpdateUserStatusDialogProps) => {
  if (!user) return null;

  const isBlocking = user.status === "ACTIVE";
  const newStatus = isBlocking ? "BLOCKED" : "ACTIVE";

  const handleUpdate = async () => {
    const toastId = toast.loading(`${isBlocking ? "Blocking" : "Unblocking"} user...`);
    try {
      const res = await updateUserStatusAction(user.id, newStatus);

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
         <div className={`absolute top-0 left-0 w-full h-1 ${isBlocking ? 'bg-destructive' : 'bg-emerald-500'}`} />
         
        <AlertDialogHeader className="mb-4">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${isBlocking ? 'bg-destructive/10 text-destructive' : 'bg-emerald-500/10 text-emerald-600'}`}>
            {isBlocking ? <UserX className="h-7 w-7" /> : <UserCheck className="h-7 w-7" />}
          </div>
          <AlertDialogTitle className="text-2xl font-black tracking-tight text-foreground">
            {isBlocking ? "Restrict User Access?" : "Restore User Access?"}
          </AlertDialogTitle>
          <AlertDialogDescription className="font-medium text-muted-foreground pt-1 text-base leading-relaxed">
            {isBlocking 
              ? `Are you sure you want to block ${user.name}? They will no longer be able to log in or use the platform services until reinstated.`
              : `This will restore platform access for ${user.name}. They will be able to log in and resume all activities immediately.`
            }
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-3 pt-4">
          <AlertDialogCancel className="rounded-xl font-bold bg-stone-100 border-none hover:bg-stone-200 text-foreground transition-all px-6 py-2.5">
            Keep Current
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
            className={`rounded-xl font-bold transition-all font-black uppercase tracking-widest px-8 shadow-lg ${
                isBlocking 
                 ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-destructive/20" 
                 : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20"
            }`}
          >
            Confirm Change
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
