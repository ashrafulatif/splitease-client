"use client";

import { useState, useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Edit, X, List, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AppField from "../shared/form/AppField";
import AppSubmitButton from "../shared/form/AppSubmitButton";
import { planZodSchema } from "@/zod/plan.validation";
import { updatePlanAction } from "@/app/(dashboardLayout)/admin/dashboard/plans/_action";
import { IPlan } from "@/types/plan.types";

interface UpdatePlanModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  plan: IPlan;
}

export const UpdatePlanModal = ({ open, setOpen, plan }: UpdatePlanModalProps) => {
  const [featureInput, setFeatureInput] = useState("");

  const form = useForm({
    defaultValues: {
      name: plan.name,
      price: plan.price,
      durationDays: plan.durationDays,
      features: [...plan.features],
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating plan...");
      try {
        const res = await updatePlanAction(plan.id, value);

        if (!res.success) {
          toast.error(res.message, { id: toastId });
          return;
        }

        toast.success(res.message, { id: toastId });
        setOpen(false);
      } catch (error) {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  // Reset form when plan changes or modal opens
  useEffect(() => {
    if (open) {
      form.reset({
        name: plan.name,
        price: plan.price,
        durationDays: plan.durationDays,
        features: [...plan.features],
      });
    }
  }, [open, plan, form]);

  const addFeature = () => {
    if (!featureInput.trim()) return;
    const currentFeatures = form.getFieldValue("features");
    form.setFieldValue("features", [...currentFeatures, featureInput.trim()]);
    setFeatureInput("");
  };

  const removeFeature = (index: number) => {
    const currentFeatures = form.getFieldValue("features");
    form.setFieldValue(
      "features",
      currentFeatures.filter((_, i) => i !== index)
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] rounded-3xl p-8 border-none shadow-2xl">
        <DialogHeader className="mb-6">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
            <Edit className="h-6 w-6" />
          </div>
          <DialogTitle className="text-2xl font-black tracking-tight">
            Update Subscription Plan
          </DialogTitle>
          <DialogDescription className="font-medium text-muted-foreground pt-1">
            Modify the pricing tier details.
          </DialogDescription>
        </DialogHeader>

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
              onChange: planZodSchema.shape.name,
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Plan Name"
                placeholder="e.g. Premium Plus"
              />
            )}
          </form.Field>

          <div className="grid grid-cols-2 gap-4">
            <form.Field
              name="price"
              validators={{
                onChange: planZodSchema.shape.price,
              }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Price ($)"
                  type="number"
                  placeholder="0"
                />
              )}
            </form.Field>

            <form.Field
              name="durationDays"
              validators={{
                onChange: planZodSchema.shape.durationDays,
              }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Duration (Days)"
                  type="number"
                  placeholder="30"
                />
              )}
            </form.Field>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-foreground">Features</label>
            <div className="flex gap-2">
              <Input
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                placeholder="Add a feature..."
                className="rounded-xl"
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addFeature();
                    }
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={addFeature}
                className="rounded-xl shrink-0"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <form.Field name="features">
              {(field) => (
                <div className="space-y-2 mt-2 max-h-[150px] overflow-y-auto pr-2 custom-scrollbar">
                  {field.state.value.map((feature: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-stone-50 p-2 rounded-lg border border-border/50 group hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <List className="w-3 h-3 text-muted-foreground" />
                        <span className="text-sm font-medium">{feature}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </form.Field>
          </div>

          <div className="pt-4">
            <form.Subscribe
              selector={(s) => [s.canSubmit, s.isSubmitting] as const}
            >
              {([canSubmit, isSubmitting]) => (
                <AppSubmitButton
                   isPending={isSubmitting}
                   disabled={!canSubmit}
                   className="rounded-xl h-12 font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all font-black uppercase tracking-widest"
                >
                  Update Plan
                </AppSubmitButton>
              )}
            </form.Subscribe>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
