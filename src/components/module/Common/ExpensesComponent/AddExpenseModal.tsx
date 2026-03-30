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
import { createExpenseAction } from "@/app/(dashboardLayout)/manager/dashboard/expenses/_action";
import { expenseZodSchema } from "@/zod/expense.validation";
import { ReceiptText, Plus } from "lucide-react";
import { IHouse } from "@/types/house.types";
import { IMonth } from "@/types/month.types";

interface AddExpenseModalProps {
  houses: IHouse[];
  months: IMonth[];
  defaultHouseId?: string;
  defaultMonthId?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const AddExpenseModal = ({
  houses,
  months,
  defaultHouseId,
  defaultMonthId,
  open,
  setOpen,
}: AddExpenseModalProps) => {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      houseId: defaultHouseId || "",
      monthId: defaultMonthId || "",
      type: "" as any,
      amount: 0,
      description: "",
    },
    onSubmit: async ({ value }) => {
      const payload = {
          ...value,
          amount: Number(value.amount)
      };
      
      const result = await createExpenseAction(payload);
      if (result?.error || result?.message === "Failed" || !result) {
        toast.error(result?.error || result?.message || "Something went wrong");
      } else {
        toast.success(result?.message || "Expense recorded successfully");
        setOpen(false);
        form.reset();
        router.refresh();
      }
    },
  });

  const expenseCategories = [
    { value: "MEAL", label: "Meal" },
    { value: "RENT", label: "Rent" },
    { value: "GAS", label: "Gas" },
    { value: "ELECTRICITY", label: "Electricity" },
    { value: "INTERNET", label: "Internet" },
    { value: "WATER", label: "Water" },
    { value: "OTHER", label: "Other" },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="font-semibold gap-2 shadow-sm px-6 py-4 rounded-xl">
           <Plus className="w-4 h-4" />
           Record Expense
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton className="max-w-lg">
        <DialogHeader>
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
            <ReceiptText className="w-6 h-6 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-bold tracking-tight">Record House Expense</DialogTitle>
          <DialogDescription className="text-muted-foreground font-medium">
            Keep track of monthly utilities and shared house costs.
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
                     const res = expenseZodSchema.shape.houseId.safeParse(value);
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
                     const res = expenseZodSchema.shape.monthId.safeParse(value);
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
              name="type"
              validators={{ 
                onChange: ({ value }) => {
                  const res = expenseZodSchema.shape.type.safeParse(value);
                  return res.success ? undefined : res.error.issues[0].message;
                }
              }}
            >
              {(field) => (
                <AppField
                  field={field as any}
                  type="select"
                  label="Category"
                  placeholder="Select type"
                  options={expenseCategories}
                />
              )}
            </form.Field>

            <form.Field
              name="amount"
              validators={{ 
                onChange: ({ value }) => {
                  const res = expenseZodSchema.shape.amount.safeParse(value);
                  return res.success ? undefined : res.error.issues[0].message;
                }
              }}
            >
              {(field) => (
                <AppField
                  field={field as any}
                  type="number"
                  label="Total Cost"
                  placeholder="৳0.00"
                />
              )}
            </form.Field>

            <form.Field
              name="description"
              validators={{ 
                onChange: ({ value }) => {
                  const res = expenseZodSchema.shape.description.safeParse(value);
                  return res.success ? undefined : res.error.issues[0].message;
                }
              }}
            >
              {(field) => (
                <AppField
                  field={field as any}
                  type="text"
                  label="Expense Details"
                  placeholder="e.g. Electricity bill for March 2026"
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
                  Confirm & Save Expense
                </AppSubmitButton>
              )}
            </form.Subscribe>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
