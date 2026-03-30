import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { AnyFieldApi } from "@tanstack/react-form";
import React from "react";

//get error message
const getErrorMessage = (error: unknown): string => {
  if (typeof error === "string") {
    return error;
  }

  if (error && typeof error === "object") {
    if ("message" in error && typeof error.message === "string") {
      return error.message;
    }
  }
  return String(error);
};

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type AppFieldProps = {
  field: AnyFieldApi;
  label: string;
  type?: "text" | "email" | "password" | "number" | "select" | "date";
  placeholder?: string;
  append?: React.ReactNode;
  prepend?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  options?: { value: string; label: string }[];
  onValueChange?: (value: string | number) => void;
};

const AppField = ({
  field,
  label,
  type = "text",
  placeholder,
  append,
  prepend,
  className,
  disabled = false,
  options,
  onValueChange,
}: AppFieldProps) => {
  const firstError =
    field.state.meta.isTouched && field.state.meta.errors.length > 0
      ? getErrorMessage(field.state.meta.errors[0])
      : null;

  const hasError = firstError !== null;

  return (
    <div className={cn("space-y-1.5", className)}>
      <Label
        htmlFor={field.name}
        className={cn(hasError && "text-destructive")}
      >
        {label}
      </Label>

      <div className="relative">
        {prepend && (
          <div className="absolute inset-y-0 left-0 items-center pl-3 pointer-events-none z-10">
            {prepend}
          </div>
        )}

        {type === "select" && options ? (
          <Select
            value={field.state.value}
            onValueChange={(value) => {
              field.handleChange(value);
              onValueChange?.(value);
            }}
            disabled={disabled}
          >
            <SelectTrigger className={cn(
              "w-full",
              className,
              hasError && "border-destructive focus-visible:ring-destructive/20"
            )}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Input
            id={field.name}
            name={field.name}
            type={type}
            value={field.state.value}
            placeholder={placeholder}
            onBlur={field.handleBlur}
            onChange={(e) => {
              const value = type === "number" ? Number(e.target.value) : e.target.value;
              field.handleChange(value as any);
              onValueChange?.(value);
            }}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${field.name}-error` : undefined}
            className={cn(
              prepend && "pl-10",
              append && "pr-10",
              hasError && "border-destructive focus-visible:ring-destructive/20",
            )}
          />
        )}
        {append && (
          <div className="absolute inset-y-0 right-0 items-center pr-3 pointer-events-none z-10">
            {append}
          </div>
        )}
        {hasError && (
          <p
            id={`${field.name}-error`}
            role="alert"
            className="text-sm text-destructive"
          >
            {firstError}
          </p>
        )}
      </div>
    </div>
  );
};

export default AppField;
