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
import { updateHouseByIdAction } from "@/app/(dashboardLayout)/manager/dashboard/house/_action";
import { houseZodSchema } from "@/zod/house.validation";

export const UpdateHouseModal = ({
  open,
  setOpen,
  house,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  house: any; // Assuming house contains an id or _id
}) => {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: house?.name || "",
      description: house?.description || "",
    },
    onSubmit: async ({ value }) => {
      const id = house?._id || house?.id;
      if (!id) return;
      
      const result = await updateHouseByIdAction(id, value);
      if (result?.error || result?.message === "Failed" || !result) {
        toast.error(result?.error || result?.message || "Something went wrong");
      } else {
        toast.success(result?.message || "House updated successfully");
        setOpen(false);
        router.refresh();
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent showCloseButton>
        <DialogHeader>
          <DialogTitle>Update House</DialogTitle>
          <DialogDescription>
            Update the details of your house. Click save when you&apos;re done.
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
                  pendingLabel="Updating..."
                  disabled={!canSubmit}
                >
                  Update House
                </AppSubmitButton>
              )}
            </form.Subscribe>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
