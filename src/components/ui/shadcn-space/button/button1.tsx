import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

type ButtonWithIconProps = {
  asChild?: boolean;
  className?: string;
  children?: React.ReactNode;
} & Omit<
  React.ComponentProps<typeof Button>,
  "asChild" | "children" | "className"
>;

const baseClassName =
  "group relative inline-flex h-11 w-fit items-center overflow-hidden rounded-xl ps-5 pe-13 text-sm font-semibold transition-all duration-300 hover:ps-13 hover:pe-5";

const iconClassName =
  "absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg bg-white text-muted-foreground transition-all duration-300 group-hover:right-[calc(100%-2.5rem)]";

const ButtonWithIcon = ({
  asChild = false,
  className,
  children,
  ...props
}: ButtonWithIconProps) => {
  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{
      className?: string;
      children?: React.ReactNode;
    }>;

    return React.cloneElement(
      child,
      {
        className: cn(
          buttonVariants({ variant: "default", size: "default" }),
          baseClassName,
          className,
          child.props.className,
        ),
      },
      <>
        <span className="relative z-10 transition-all duration-300">
          {child.props.children}
        </span>
        <span className={iconClassName}>
          <ArrowUpRight size={16} />
        </span>
      </>,
    );
  }

  return (
    <Button className={cn(baseClassName, className)} {...props}>
      <span className="relative z-10 transition-all duration-300">
        {children ?? "Create Free Account"}
      </span>
      <span className={iconClassName}>
        <ArrowUpRight size={16} />
      </span>
    </Button>
  );
};

export default ButtonWithIcon;
