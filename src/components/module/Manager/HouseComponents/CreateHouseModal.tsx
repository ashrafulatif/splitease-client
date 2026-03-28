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
import { createHouseAction } from "@/app/(dashboardLayout)/manager/dashboard/house/_action";
import { houseZodSchema } from "@/zod/house.validation";

export const CreateHouseModal = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
    onSubmit: async ({ value }) => {
      const result = await createHouseAction(value);
      if (result?.error || result?.message === "Failed" || !result) {
        toast.error(result?.error || result?.message || "Something went wrong");
      } else {
        toast.success(result?.message || "House created successfully");
        setOpen(false);
        form.reset();
        router.refresh();
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add House</Button>
      </DialogTrigger>
      <DialogContent showCloseButton>
        <DialogHeader>
          <DialogTitle>Add New House</DialogTitle>
          <DialogDescription>
            Enter the details of the new house. Click save when you're done.
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
              name="name"
              validators={{ onChange: houseZodSchema.shape.name }}
            >
              {(field) => (
                <AppField
                  field={field as any}
                  label="House Name"
                  placeholder="Enter house name"
                />
              )}
            </form.Field>

            <form.Field
              name="description"
              validators={{ onChange: houseZodSchema.shape.description as any }}
            >
              {(field) => (
                <AppField
                  field={field as any}
                  label="Description"
                  placeholder="Enter house description (optional)"
                />
              )}
            </form.Field>

            <form.Subscribe
              selector={(state) => [state.isSubmitting, state.canSubmit] as const}
            >
              {([isSubmitting, canSubmit]) => (
                <AppSubmitButton 
                  isPending={isSubmitting} 
                  pendingLabel="Saving..."
                  disabled={!canSubmit}
                >
                  Save House
                </AppSubmitButton>
              )}
            </form.Subscribe>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
