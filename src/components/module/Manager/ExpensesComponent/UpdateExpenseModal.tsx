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
} from "@/components/ui/dialog";
import AppField from "../../shared/form/AppField";
import AppSubmitButton from "../../shared/form/AppSubmitButton";
import { updateExpenseByIdAction } from "@/app/(dashboardLayout)/manager/dashboard/expenses/_action";
import { expenseZodSchema } from "@/zod/expense.validation";
import { Pencil } from "lucide-react";
import { IHouse } from "@/types/house.types";
import { IMonth } from "@/types/month.types";
import { IExpense, IUpdateExpense } from "@/types/expense.types";

interface UpdateExpenseModalProps {
  houses: IHouse[];
  months: IMonth[];
  expense: IExpense;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const UpdateExpenseModal = ({
  houses,
  months,
  expense,
  open,
  setOpen,
}: UpdateExpenseModalProps) => {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      houseId: expense.houseId,
      monthId: expense.monthId,
      type: expense.type,
      amount: expense.amount,
      description: expense.description,
    },
    onSubmit: async ({ value }) => {
      const payload: IUpdateExpense = {
        type: value.type,
        amount: Number(value.amount),
        description: value.description,
      };

      const result = await updateExpenseByIdAction(expense.id, payload);
      if (result?.error || result?.message === "Failed" || !result) {
        toast.error(result?.error || result?.message || "Something went wrong");
      } else {
        toast.success(result?.message || "Expense updated successfully");
        setOpen(false);
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
      <DialogContent showCloseButton className="max-w-lg">
        <DialogHeader>
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
            <Pencil className="w-6 h-6 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-semibold tracking-tight text-foreground">
            Update Expense Detail
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Make changes to the selected house expense record.
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
              <form.Field name="houseId">
                {() => (
                  <div className="space-y-1.5 opacity-70">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider leading-none">
                      House
                    </span>
                    <div className="h-10 px-3 flex items-center bg-muted rounded-xl text-sm font-medium border border-border truncate">
                      {houses.find((h) => h.id === expense.houseId)?.name ||
                        "N/A"}
                    </div>
                  </div>
                )}
              </form.Field>

              <form.Field name="monthId">
                {() => (
                  <div className="space-y-1.5 opacity-70">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider leading-none">
                      Month
                    </span>
                    <div className="h-10 px-3 flex items-center bg-muted rounded-xl text-sm font-medium border border-border truncate">
                      {months.find((m) => m.id === expense.monthId)?.name ||
                        "N/A"}
                    </div>
                  </div>
                )}
              </form.Field>
            </div>

            <form.Field
              name="type"
              validators={{
                onChange: ({ value }) => {
                  const res = expenseZodSchema.shape.type.safeParse(value);
                  return res.success ? undefined : res.error.issues[0].message;
                },
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
                },
              }}
            >
              {(field) => (
                <AppField
                  field={field as any}
                  type="number"
                  label="Amount (৳)"
                  placeholder="0.00"
                />
              )}
            </form.Field>

            <form.Field
              name="description"
              validators={{
                onChange: ({ value }) => {
                  const res =
                    expenseZodSchema.shape.description.safeParse(value);
                  return res.success ? undefined : res.error.issues[0].message;
                },
              }}
            >
              {(field) => (
                <AppField
                  field={field as any}
                  type="text"
                  label="Reason / Description"
                  placeholder="e.g. WiFi Bill Jan"
                />
              )}
            </form.Field>

            <div className="pt-2">
              <form.Subscribe
                selector={(state) =>
                  [state.isSubmitting, state.canSubmit] as const
                }
              >
                {([isSubmitting, canSubmit]) => (
                  <AppSubmitButton
                    isPending={isSubmitting}
                    pendingLabel="Saving..."
                    disabled={!canSubmit}
                    className="h-12 text-sm font-semibold rounded-xl"
                  >
                    Save Changes
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
