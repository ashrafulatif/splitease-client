"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AppField from "../../shared/form/AppField";
import AppSubmitButton from "../../shared/form/AppSubmitButton";
import { updateDepositByIdAction } from "@/app/(dashboardLayout)/manager/dashboard/deposits/_action";
import { depositZodSchema } from "@/zod/deposits.validation";
import {  Pencil } from "lucide-react";
import { IDeposit, IUpdateDepositPayload } from "@/types/deposits.types";

interface UpdateDepositModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  deposit: IDeposit;
  houses: any[];
  months: any[];
  members: any[];
}

export const UpdateDepositModal = ({
  open,
  setOpen,
  deposit,
  houses,
  months,
  members,
}: UpdateDepositModalProps) => {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      houseId: deposit.houseId,
      monthId: deposit.monthId,
      userId: deposit.userId,
      amount: deposit.amount,
      note: deposit.note || "",
    },
    onSubmit: async ({ value }) => {
      const payload: IUpdateDepositPayload = {
        amount: Number(value.amount),
        note: value.note,
      };

      const result = await updateDepositByIdAction(deposit.id, payload);
      
      if (result?.error || result?.message === "Failed" || !result) {
        toast.error(result?.error || result?.message || "Something went wrong");
      } else {
        toast.success(result?.message || "Deposit updated successfully");
        setOpen(false);
        router.refresh();
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent showCloseButton className="max-w-lg">
        <DialogHeader>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-4">
            <Pencil className="w-6 h-6 text-amber-500" />
          </div>
          <DialogTitle className="text-2xl font-bold tracking-tight text-foreground/90">Edit Deposit Entry</DialogTitle>
          <DialogDescription className="font-medium text-muted-foreground/80">
            Make changes to the selected deposit record.
          </DialogDescription>
        </DialogHeader>
        <div className="py-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-4 border-b pb-6">
               <form.Field
                 name="houseId"
               >
                 {(field) => (
                   <div className="space-y-1.5 opacity-60">
                      <span className="text-sm font-semibold text-muted-foreground uppercase tracking-widest leading-none">House</span>
                      <div className="h-10 px-3 flex items-center bg-muted rounded-xl text-sm font-bold border border-muted/50 truncate">
                         {houses.find(h => h.id === deposit.houseId)?.name || "N/A"}
                      </div>
                   </div>
                 )}
               </form.Field>

               <form.Field
                 name="monthId"
               >
                 {(field) => (
                   <div className="space-y-1.5 opacity-60">
                      <span className="text-sm font-semibold text-muted-foreground uppercase tracking-widest leading-none">Month</span>
                      <div className="h-10 px-3 flex items-center bg-muted rounded-xl text-sm font-bold border border-muted/50 truncate">
                         {months.find(m => m.id === deposit.monthId)?.name || "N/A"}
                      </div>
                   </div>
                 )}
               </form.Field>
            </div>

            <form.Field
              name="userId"
              validators={{ 
                onChange: ({ value }) => {
                  const res = depositZodSchema.shape.userId.safeParse(value);
                  return res.success ? undefined : res.error.issues[0].message;
                }
              }}
            >
              {(field) => (
                <AppField
                  field={field as any}
                  type="select"
                  label="Member"
                  placeholder="Select member"
                  disabled={true}
                  options={members?.map(m => ({
                    value: m.userId,
                    label: m.user?.name || "Unknown",
                  })) || []}
                  className="opacity-70 pointer-events-none"
                />
              )}
            </form.Field>

            <form.Field
              name="amount"
              validators={{ 
                onChange: ({ value }) => {
                  const res = depositZodSchema.shape.amount.safeParse(value);
                  return res.success ? undefined : res.error.issues[0].message;
                }
              }}
            >
              {(field) => (
                <AppField
                  field={field as any}
                  type="number"
                  label="Deposit Amount"
                  placeholder="৳0.00"
                />
              )}
            </form.Field>

            <form.Field
              name="note"
              validators={{ 
                onChange: ({ value }) => {
                  const res = depositZodSchema.shape.note.safeParse(value);
                  return res.success ? undefined : res.error.issues[0].message;
                }
              }}
            >
              {(field) => (
                <AppField
                  field={field as any}
                  type="text"
                  label="Note"
                  placeholder="e.g. Electricity bill sharing"
                />
              )}
            </form.Field>

            <div className="pt-2">
                <form.Subscribe
                selector={(state) => [state.isSubmitting, state.canSubmit] as const}
                >
                {([isSubmitting, canSubmit]) => (
                    <AppSubmitButton 
                    isPending={isSubmitting} 
                    pendingLabel="Saving Changes..."
                    disabled={!canSubmit}
                    className="h-12 text-[15px] font-extrabold rounded-xl"
                    >
                    Update Deposit Record
                    </AppSubmitButton>
                )}
                </form.Subscribe>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
