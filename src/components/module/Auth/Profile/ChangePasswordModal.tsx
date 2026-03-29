"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "@tanstack/react-form";
import { changePasswordBaseZodSchema } from "@/zod/auth.validation";
import AppField from "../../shared/form/AppField";
import AppSubmitButton from "../../shared/form/AppSubmitButton";
import { changePasswordAction } from "@/app/(dashboardLayout)/(commonProtectedLayout)/my-profile/_action";
import { toast } from "sonner";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ChangePasswordModal = ({ isOpen, onOpenChange }: ChangePasswordModalProps) => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating password...");
      try {
        const res = await changePasswordAction({
          currentPassword: value.currentPassword,
          newPassword: value.newPassword,
        });

        if (!res.success) {
          toast.error(res.message, { id: toastId });
          return;
        }

        toast.success(res.message, { id: toastId });
        form.reset();
        onOpenChange(false);
      } catch (error) {
        toast.error("Something went wrong. Please try again.", { id: toastId });
      }
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] rounded-3xl p-8 border-none shadow-2xl">
        <DialogHeader className="mb-6">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
            <Lock className="h-6 w-6" />
          </div>
          <DialogTitle className="text-2xl font-black tracking-tight">Change Password</DialogTitle>
          <DialogDescription className="font-medium text-muted-foreground pt-1">
            Secure your account by updating your password regularly.
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
            name="currentPassword"
            validators={{
              onChange: changePasswordBaseZodSchema.shape.currentPassword,
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Current Password"
                type={showOldPassword ? "text" : "password"}
                placeholder="••••••••"
                append={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-transparent"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                  >
                    {showOldPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                }
              />
            )}
          </form.Field>

          <form.Field
            name="newPassword"
            validators={{
              onChange: changePasswordBaseZodSchema.shape.newPassword,
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="New Password"
                type={showNewPassword ? "text" : "password"}
                placeholder="••••••••"
                append={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-transparent"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                }
              />
            )}
          </form.Field>

          <form.Field
            name="confirmPassword"
            validators={{
              onChange: ({ value, fieldApi }) => {
                if (value !== fieldApi.form.getFieldValue("newPassword")) {
                  return "Passwords do not match";
                }
                return undefined;
              },
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Confirm New Password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                append={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                }
              />
            )}
          </form.Field>

          <div className="pt-4">
            <form.Subscribe
              selector={(s) => [s.canSubmit, s.isSubmitting] as const}
            >
              {([canSubmit, isSubmitting]) => (
                <AppSubmitButton
                   isPending={isSubmitting}
                   disabled={!canSubmit}
                   className="rounded-xl h-12 font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
                >
                  Update Password
                </AppSubmitButton>
              )}
            </form.Subscribe>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordModal;
