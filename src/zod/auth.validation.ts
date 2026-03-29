import { z } from "zod";

export const loginZodSchema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long"),
  // .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  // .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  // .regex(/[0-9]/, "Password must contain at least one number")
  // .regex(/[@$!%*?&]/, "Password must contain at least one special character (@, $, !, %, *, ?, &)")
});

export const registerZodSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters long"),
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long"),
});

export const changePasswordBaseZodSchema = z.object({
  currentPassword: z
    .string()
    .min(1, "Current password is required")
    .min(8, "Password must be at least 8 characters long"),
  newPassword: z
    .string()
    .min(1, "New password is required")
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: z
    .string()
    .min(1, "Confirm password is required")
});

export const changePasswordZodSchema = changePasswordBaseZodSchema.refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});

export const updateProfileZodSchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z.any().optional(),
});
