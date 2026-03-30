/* eslint-disable @typescript-eslint/no-explicit-any */
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AppField from "../../shared/form/AppField";
import AppSubmitButton from "../../shared/form/AppSubmitButton";
import { createDepositAction } from "@/app/(dashboardLayout)/manager/dashboard/deposits/_action";
import { depositZodSchema } from "@/zod/deposits.validation";
import { PiggyBank, Plus } from "lucide-react";
import { IHouse } from "@/types/house.types";
import { IMonth } from "@/types/month.types";

interface AddDepositModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  houses: IHouse[];
  months: IMonth[];
  members: any[];
  defaultHouseId?: string;
  defaultMonthId?: string;
}

export const AddDepositModal = ({
  open,
  setOpen,
  houses,
  months,
  members,
  defaultHouseId,
  defaultMonthId,
}: AddDepositModalProps) => {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      houseId: defaultHouseId || "",
      monthId: defaultMonthId || "",
      userId: "",
      amount: 0,
      note: "",
    },
    onSubmit: async ({ value }) => {
      const payload = {
        ...value,
        amount: Number(value.amount),
      };
      const result = await createDepositAction(payload);
      if (result?.error || result?.message === "Failed" || !result) {
        toast.error(result?.error || result?.message || "Something went wrong");
      } else {
        toast.success(result?.message || "Deposit recorded successfully");
        setOpen(false);
        form.reset();
        router.refresh();
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="font-semibold gap-2 shadow-sm px-6 py-4 rounded-xl">
           <Plus className="w-4 h-4" />
           Log Deposit
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton className="max-w-lg">
        <DialogHeader>
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
            <PiggyBank className="w-6 h-6 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-bold tracking-tight">Record New Deposit</DialogTitle>
          <DialogDescription className="text-muted-foreground font-medium">
            Keep track of monthly contributions for transparent expense sharing.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
               <form.Field
                 name="houseId"
                 validators={{ 
                   onChange: ({ value }) => {
                     const res = depositZodSchema.shape.houseId.safeParse(value);
                     return res.success ? undefined : res.error.issues[0].message;
                   }
                 }}
               >
                 {(field) => (
                   <AppField
                     field={field as any}
                     type="select"
                     label="House"
                     placeholder="Select house"
                     options={houses?.map(h => ({
                       value: h.id,
                       label: h.name,
                     })) || []}
                   />
                 )}
               </form.Field>

               <form.Field
                 name="monthId"
                 validators={{ 
                   onChange: ({ value }) => {
                     const res = depositZodSchema.shape.monthId.safeParse(value);
                     return res.success ? undefined : res.error.issues[0].message;
                   }
                 }}
               >
                 {(field) => (
                   <AppField
                     field={field as any}
                     type="select"
                     label="Month"
                     placeholder="Select month"
                     options={months?.map(m => ({
                       value: m.id,
                       label: m.name,
                     })) || []}
                   />
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
                  label="Select Member"
                  placeholder="Choose member"
                  options={members?.map(m => ({
                    value: m.userId,
                    label: m.user?.name || "Unknown",
                  })) || []}
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
                  label="Amount"
                  placeholder="Enter amount (৳)"
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
                  label="Note (Optional)"
                  placeholder="What is this deposit for?"
                />
              )}
            </form.Field>

            <form.Subscribe
              selector={(state) => [state.isSubmitting, state.canSubmit] as const}
            >
              {([isSubmitting, canSubmit]) => (
                <AppSubmitButton 
                  isPending={isSubmitting} 
                  pendingLabel="Logging..."
                  disabled={!canSubmit}
                  className="rounded-xl h-12 text-md font-bold"
                >
                  Confirm & Save Deposit
                </AppSubmitButton>
              )}
            </form.Subscribe>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
