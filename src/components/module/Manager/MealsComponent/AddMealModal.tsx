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
import { addMealAction } from "@/app/(dashboardLayout)/manager/dashboard/meals/_action";
import { mealZodSchema } from "@/zod/meal.validation";
import { Utensils } from "lucide-react";
import { IHouse } from "@/types/house.types";
import { IMonth } from "@/types/month.types";

export const AddMealModal = ({ 
  houses, 
  months, 
  defaultHouseId, 
  defaultMonthId 
}: { 
  houses: IHouse[];
  months: IMonth[];
  defaultHouseId?: string; 
  defaultMonthId?: string; 
}) => {
  const [open, setOpen] = useState(false);
  const [selectedHouseId, setSelectedHouseId] = useState(defaultHouseId || "");
  const router = useRouter();

  const getMemberOptionsByHouse = (houseId: string) => {
    const selectedHouse = houses.find((house) => house.id === houseId);

    if (!selectedHouse) return [];

    const creatorOption = selectedHouse.creator
      ? [{ value: selectedHouse.creator.id, label: `${selectedHouse.creator.name} (Owner)` }]
      : [];

    const memberOptions = (selectedHouse.members || []).map((member) => ({
      value: member.userId,
      label: member.user?.name || "Unknown",
    }));

    const mergedOptions = [...creatorOption, ...memberOptions];
    const uniqueMap = new Map(mergedOptions.map((option) => [option.value, option]));

    return Array.from(uniqueMap.values());
  };

  const memberOptions = getMemberOptionsByHouse(selectedHouseId);

  const form = useForm({
    defaultValues: {
      houseId: defaultHouseId || "",
      monthId: defaultMonthId || "",
      userId: memberOptions[0]?.value || "",
      date: new Date().toISOString().split('T')[0],
      mealType: "LUNCH" as "BREAKFAST" | "LUNCH" | "DINNER",
    },
    onSubmit: async ({ value }) => {
      const payload = {
          ...value,
          date: new Date(value.date).toISOString()
      };
      
      const result = await addMealAction(payload);
      if (result?.error || result?.message === "Failed" || !result) {
        toast.error(result?.error || result?.message || "Something went wrong");
      } else {
        toast.success(result?.message || "Meal recorded successfully");
        setOpen(false);
        form.reset();
        router.refresh();
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="font-semibold gap-2 shadow-sm px-6 py-4">
           <Utensils className="w-4 h-4" />
           Log Meal
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton>
        <DialogHeader>
          <DialogTitle>Log a New Meal</DialogTitle>
          <DialogDescription>
            Record meal details for accurate expense tracking.
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
            <div className="grid grid-cols-2 gap-4 border-b pb-4 mb-4">
               <form.Field
                 name="houseId"
                 validators={{ 
                   onChange: ({ value }) => {
                     const res = mealZodSchema.shape.houseId.safeParse(value);
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
                     onValueChange={(value) => {
                       const nextHouseId = String(value);
                       setSelectedHouseId(nextHouseId);

                       const nextMemberOptions = getMemberOptionsByHouse(nextHouseId);
                       form.setFieldValue("userId", nextMemberOptions[0]?.value || "");
                     }}
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
                     const res = mealZodSchema.shape.monthId.safeParse(value);
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
                  const res = mealZodSchema.shape.userId.safeParse(value);
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
                  options={memberOptions}
                />
              )}
            </form.Field>

            <form.Field
              name="date"
              validators={{ 
                onChange: ({ value }) => {
                  const res = mealZodSchema.shape.date.safeParse(value);
                  return res.success ? undefined : res.error.issues[0].message;
                }
              }}
            >
              {(field) => (
                <AppField
                  field={field as any}
                  type="date"
                  label="Meal Date"
                />
              )}
            </form.Field>

            <form.Field
              name="mealType"
              validators={{ 
                onChange: ({ value }) => {
                  const res = mealZodSchema.shape.mealType.safeParse(value);
                  return res.success ? undefined : res.error.issues[0].message;
                }
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
                      { value: "DINNER", label: "Dinner" }
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
                  pendingLabel="Logging..."
                  disabled={!canSubmit}
                >
                  Save Meal
                </AppSubmitButton>
              )}
            </form.Subscribe>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
