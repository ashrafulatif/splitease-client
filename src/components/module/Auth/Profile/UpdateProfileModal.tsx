"use client";

import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "@tanstack/react-form";
import { updateProfileZodSchema } from "@/zod/auth.validation";
import AppField from "../../shared/form/AppField";
import AppSubmitButton from "../../shared/form/AppSubmitButton";
import { updateProfileAction } from "@/app/(dashboardLayout)/(commonProtectedLayout)/my-profile/_action";
import { toast } from "sonner";
import { User, Camera, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UpdateProfileModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    name: string;
    image?: string;
  };
}

const UpdateProfileModal = ({ isOpen, onOpenChange, user }: UpdateProfileModalProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(user.image || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    defaultValues: {
      name: user.name,
      image: null as File | null,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating profile...");
      try {
        const formData = new FormData();
        if (value.name) formData.append("name", value.name);
        if (value.image) formData.append("image", value.image);

        const res = await updateProfileAction(formData);

        if (!res.success) {
          toast.error(res.message, { id: toastId });
          return;
        }

        toast.success(res.message, { id: toastId });
        onOpenChange(false);
      } catch (error) {
        toast.error("Something went wrong. Please try again.", { id: toastId });
      }
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
    const file = e.target.files?.[0];
    if (file) {
      field.handleChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetImage = (field: any) => {
    field.handleChange(null);
    setImagePreview(user.image || null);
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] rounded-3xl p-8 border-none shadow-2xl">
        <DialogHeader className="mb-6">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
            <User className="h-6 w-6" />
          </div>
          <DialogTitle className="text-2xl font-black tracking-tight">Update Profile</DialogTitle>
          <DialogDescription className="font-medium text-muted-foreground pt-1">
            Update your personal information and profile picture.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          {/* Profile Image Upload */}
          <div className="flex flex-col items-center justify-center gap-4 py-2">
            <div className="relative group">
              <Avatar className="h-24 w-24 border-4 border-white shadow-xl rounded-2xl ring-4 ring-primary/5 transition-all duration-500 group-hover:ring-primary/20">
                <AvatarImage src={imagePreview || undefined} alt={user.name} />
                <AvatarFallback className="bg-primary text-white text-2xl font-black rounded-2xl">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-xl shadow-lg border-2 border-white hover:scale-110 transition-transform bg-white hover:bg-stone-50"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="h-4 w-4 text-primary" />
              </Button>
            </div>
            
            <form.Field name="image">
              {(field) => (
                <>
                  <div className="hidden">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, field)}
                    />
                  </div>
                  {imagePreview !== user.image && (
                    <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        className="text-[10px] font-black uppercase tracking-widest h-auto py-1 px-3 text-muted-foreground hover:text-primary transition-colors"
                        onClick={() => resetImage(field)}
                    >
                        <RotateCcw className="h-3 w-3 mr-1.5" />
                        Reset Changes
                    </Button>
                  )}
                </>
              )}
            </form.Field>
          </div>

          <form.Field
            name="name"
            validators={{
              onChange: updateProfileZodSchema.shape.name,
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Full Name"
                placeholder="Enter your name"
                className="text-sm font-bold"
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
                   className="rounded-xl h-12 font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all w-full"
                >
                  Save Changes
                </AppSubmitButton>
              )}
            </form.Subscribe>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileModal;
