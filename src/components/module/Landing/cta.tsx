import { DecorIcon } from "@/components/ui/decor-icon";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export function CallToAction() {
  return (
    <div className="relative mx-auto flex w-full max-w-5xl flex-col justify-between gap-y-4 border-y px-4 py-16 dark:bg-[radial-gradient(35%_80%_at_25%_0%,--theme(--color-foreground/.08),transparent)]">
      <DecorIcon className="size-4" position="top-left" />
      <DecorIcon className="size-4" position="top-right" />
      <DecorIcon className="size-4" position="bottom-left" />
      <DecorIcon className="size-4" position="bottom-right" />

      <div className="pointer-events-none absolute -inset-y-6 -left-px w-px border-l" />
      <div className="pointer-events-none absolute -inset-y-6 -right-px w-px border-r" />

      <h2 className="text-center font-semibold text-xl md:text-3xl">
        Simplify Your Shared House Management
      </h2>
      <p className="text-balance text-center font-medium text-muted-foreground text-sm md:text-base">
        Track meals, deposits, expenses, and monthly settlements in one place.
        Start with a free account and upgrade whenever you are ready.
      </p>

      <div className="flex items-center justify-center gap-2">
        <Button asChild variant="outline">
          <Link href="/about">Learn More</Link>
        </Button>
        <Button asChild>
          <Link href="/register">
            Get Started <ArrowRightIcon data-icon="inline-end" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
