"use client";

import { useState, useEffect } from "react";
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
import { updateMealByIdAction } from "@/app/(dashboardLayout)/manager/dashboard/meals/_action";
import { z } from "zod";

export const updateMealZodSchema = z.object({
  date: z.string().min(1, "Date is required"),
  mealType: z.enum(["BREAKFAST", "LUNCH", "DINNER"]),
});

export const UpdateMealModal = ({
  open,
  setOpen,
  meal,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  meal: any;
}) => {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      date: meal?.date ? new Date(meal.date).toISOString().split("T")[0] : "",
      mealType: meal?.mealType || "LUNCH",
    },
    onSubmit: async ({ value }) => {
      if (!meal?.id && !meal?._id) return;
      
      const payload = {
        date: new Date(value.date).toISOString(),
        mealType: value.mealType as "BREAKFAST" | "LUNCH" | "DINNER",
      };

      const result = await updateMealByIdAction(meal.id || meal._id, payload);
      
      if (result?.error || result?.message === "Failed" || !result) {
        toast.error(result?.error || result?.message || "Failed to update meal");
      } else {
        toast.success(result?.message || "Meal updated successfully");
        setOpen(false);
        router.refresh();
      }
    },
  });

  // Re-sync form default values if meal prop changes
  useEffect(() => {
    if (meal) {
      form.setFieldValue("date", meal.date ? new Date(meal.date).toISOString().split("T")[0] : "");
      form.setFieldValue("mealType", meal.mealType || "LUNCH");
    }
  }, [meal]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent showCloseButton>
        <DialogHeader>
          <DialogTitle>Edit Meal Entry</DialogTitle>
          <DialogDescription>
            Update the date or type of this meal log.
          </DialogDescription>
        </DialogHeader>
        <div className="py-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-4"
          >
            <form.Field
              name="date"
              validators={{
                onChange: ({ value }) => {
                  const res = updateMealZodSchema.shape.date.safeParse(value);
                  return res.success ? undefined : res.error.issues[0].message;
                },
              }}
            >
              {(field) => (
                <AppField field={field as any} type="date" label="Meal Date" />
              )}
            </form.Field>

            <form.Field
              name="mealType"
              validators={{
                onChange: ({ value }) => {
                  const res = updateMealZodSchema.shape.mealType.safeParse(value);
                  return res.success ? undefined : res.error.issues[0].message;
                },
              }}
            >
              {(field) => (
                <AppField
                  field={field as any}
                  type="select"
                  label="Meal Type"
                  options={[
                    { value: "BREAKFAST", label: "Breakfast" },
                    { value: "LUNCH", label: "Lunch" },
                    { value: "DINNER", label: "Dinner" },
                  ]}
                />
              )}
            </form.Field>

            <form.Subscribe
              selector={(state) => [state.isSubmitting, state.canSubmit] as const}
            >
              {([isSubmitting, canSubmit]) => (
                <AppSubmitButton
                  isPending={isSubmitting}
                  pendingLabel="Updating..."
                  disabled={!canSubmit}
                >
                  Save Changes
                </AppSubmitButton>
              )}
            </form.Subscribe>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
