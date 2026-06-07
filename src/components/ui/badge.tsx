import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-tight",
  {
    variants: {
      variant: {
        default:
          "border border-[color:var(--border)] bg-[color:var(--background)] text-[color:var(--foreground)]",
        primary:
          "bg-[color:var(--orange-soft)] text-[color:var(--primary)] ring-1 ring-inset ring-[color:var(--primary)]/15",
        muted:
          "bg-[color:var(--muted)] text-[color:var(--muted-foreground)]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { badgeVariants };
