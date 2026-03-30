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
import { addMemberAction } from "@/app/(dashboardLayout)/manager/dashboard/members/_action";
import { memberZodSchema } from "@/zod/member.validation";

export const AddMemberModal = ({ houses }: { houses: any[] }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      houseId: houses?.length === 1 ? (houses[0].id || houses[0]._id) : "",
      name: "",
      email: "",
    },
    onSubmit: async ({ value }) => {
      const result = await addMemberAction(value);
      if (result?.error || result?.message === "Failed" || !result) {
        toast.error(result?.error || result?.message || "Something went wrong");
      } else {
        toast.success(result?.message || "Member added successfully. Check your email for credentials.");
        setOpen(false);
        form.reset();
        router.refresh();
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Member</Button>
      </DialogTrigger>
      <DialogContent showCloseButton>
        <DialogHeader>
          <DialogTitle>Add New Member</DialogTitle>
          <DialogDescription>
            Invite someone to join your house. They will receive an invitation via email.
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
                  const res = memberZodSchema.shape.houseId.safeParse(value);
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
                  const res = memberZodSchema.shape.name.safeParse(value);
                  return res.success ? undefined : res.error.issues[0].message;
                }
              }}
            >
              {(field) => (
                <AppField
                  field={field as any}
                  label="Name"
                  placeholder="Enter member's name"
                />
              )}
            </form.Field>

            <form.Field
              name="email"
              validators={{ 
                onChange: ({ value }) => {
                  const res = memberZodSchema.shape.email.safeParse(value);
                  return res.success ? undefined : res.error.issues[0].message;
                }
              }}
            >
              {(field) => (
                <AppField
                  field={field as any}
                  type="email"
                  label="Email"
                  placeholder="Enter email address"
                />
              )}
            </form.Field>

            <form.Subscribe
              selector={(state) => [state.isSubmitting, state.canSubmit] as const}
            >
              {([isSubmitting, canSubmit]) => (
                <AppSubmitButton 
                  isPending={isSubmitting} 
                  pendingLabel="Adding..."
                  disabled={!canSubmit}
                >
                  Add Member
                </AppSubmitButton>
              )}
            </form.Subscribe>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
