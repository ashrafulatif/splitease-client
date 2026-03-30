"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AppField from "../../shared/form/AppField";
import AppSubmitButton from "../../shared/form/AppSubmitButton";
import { updateHouseAction } from "@/app/(dashboardLayout)/admin/dashboard/house-management/_action";
import { houseZodSchema } from "@/zod/house.validation";
import { IHouse } from "@/types/house.types";

interface AdminUpdateHouseDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  house: IHouse | null;
}

export const AdminUpdateHouseDialog = ({
  open,
  setOpen,
  house,
}: AdminUpdateHouseDialogProps) => {
  if (!house) return null;

  const form = useForm({
    defaultValues: {
      name: house.name || "",
      description: house.description || "",
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating house infrastructure...");
      try {
        const res = await updateHouseAction(house.id, value);

        if (!res.success) {
          toast.error(res.message, { id: toastId });
          return;
        }

        toast.success(res.message, { id: toastId });
        setOpen(false);
      } catch (error) {
        toast.error("An unexpected error occurred", { id: toastId });
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="rounded-3xl border-border/50 max-w-[450px]">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-2xl font-black tracking-tight">Modify Infrastructure</DialogTitle>
          <DialogDescription className="text-sm font-medium text-muted-foreground">
            Update the identity and descriptive metadata for **{house.name}**.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-5"
          >
            <form.Field
              name="name"
              validators={{
                onChange: houseZodSchema.shape.name,
              }}
            >
              {(field) => (
                <AppField
                  field={field as any}
                  label="House Designation"
                  placeholder="e.g. Skyline Residency"
                />
              )}
            </form.Field>

            <form.Field
              name="description"
              validators={{
                onChange: houseZodSchema.shape.description as any,
              }}
            >
              {(field) => (
                <AppField
                  field={field as any}
                  label="Governance Description"
                  placeholder="Provide context for this housing unit..."
                />
              )}
            </form.Field>

            <form.Subscribe
              selector={(state) => [state.isSubmitting, state.canSubmit] as const}
            >
              {([isSubmitting, canSubmit]) => (
                <AppSubmitButton
                  isPending={isSubmitting}
                  pendingLabel="Committing Changes..."
                  disabled={!canSubmit}
                  className="w-full h-12 rounded-2xl font-black uppercase tracking-widest text-[10px]"
                >
                  Confirm Infrastructure Update
                </AppSubmitButton>
              )}
            </form.Subscribe>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
