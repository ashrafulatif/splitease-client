/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
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
import { createMonthAction } from "@/app/(dashboardLayout)/manager/dashboard/months/_action";
import { monthZodSchema } from "@/zod/month.validation";
import { Plus } from "lucide-react";

export const AddMonthModal = ({ houses }: { houses: any[] }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      houseId: houses?.length === 1 ? (houses[0].id || houses[0]._id) : "",
      name: "",
      startDate: "",
      endDate: "",
    },
    onSubmit: async ({ value }) => {
      const result = await createMonthAction({
          ...value,
          startDate: new Date(value.startDate).toISOString(),
          endDate: new Date(value.endDate).toISOString(),
      });
      if (result?.error || result?.message === "Failed" || !result) {
        toast.error(result?.error || result?.message || "Something went wrong");
      } else {
        toast.success(result?.message || "Month created successfully");
        setOpen(false);
        form.reset();
        router.refresh();
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="font-semibold gap-2">
           <Plus className="w-4 h-4" />
           Start New Month
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton>
        <DialogHeader>
          <DialogTitle>Start a New Month</DialogTitle>
          <DialogDescription>
            Create a new month configuration to track your expenses and meals for a specific period.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-4"
          >
            <form.Field
              name="houseId"
              validators={{ 
                onChange: ({ value }) => {
                  const res = monthZodSchema.shape.houseId.safeParse(value);
                  return res.success ? undefined : res.error.issues[0].message;
                }
              }}
            >
              {(field) => (
                <AppField
                  field={field as any}
                  type="select"
                  label="House"
                  placeholder="Select a house"
                  options={houses?.map((house: any) => ({
                    value: house.id || house._id,
                    label: house.name,
                  })) || []}
                />
              )}
            </form.Field>

            <form.Field
              name="name"
              validators={{ 
                onChange: ({ value }) => {
                  const res = monthZodSchema.shape.name.safeParse(value);
                  return res.success ? undefined : res.error.issues[0].message;
                }
              }}
            >
              {(field) => (
                <AppField
                  field={field as any}
                  label="Month Name"
                  placeholder="e.g. March 2026"
                />
              )}
            </form.Field>

            <div className="grid grid-cols-2 gap-4">
              <form.Field
                name="startDate"
                validators={{ 
                  onChange: ({ value }) => {
                    const res = monthZodSchema.shape.startDate.safeParse(value);
                    return res.success ? undefined : res.error.issues[0].message;
                  }
                }}
              >
                {(field) => (
                  <AppField
                    field={field as any}
                    type="date"
                    label="Start Date"
                  />
                )}
              </form.Field>

              <form.Field
                name="endDate"
                validators={{ 
                  onChange: ({ value }) => {
                    const res = monthZodSchema.shape.endDate.safeParse(value);
                    return res.success ? undefined : res.error.issues[0].message;
                  }
                }}
              >
                {(field) => (
                  <AppField
                    field={field as any}
                    type="date"
                    label="End Date"
                  />
                )}
              </form.Field>
            </div>

            <form.Subscribe
              selector={(state) => [state.isSubmitting, state.canSubmit] as const}
            >
              {([isSubmitting, canSubmit]) => (
                <AppSubmitButton 
                  isPending={isSubmitting} 
                  pendingLabel="Starting Month..."
                  disabled={!canSubmit}
                >
                  Start Month
                </AppSubmitButton>
              )}
            </form.Subscribe>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
