import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,background-color,box-shadow,transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[color:var(--ink-strong)] text-[color:var(--background)] hover:bg-[color:var(--foreground)] active:scale-[0.985] shadow-[0_1px_2px_oklch(0_0_0_/_0.06),0_8px_24px_-12px_oklch(0_0_0_/_0.18)]",
        primary:
          "bg-[color:var(--primary)] text-white hover:brightness-[1.05] active:scale-[0.985] shadow-[inset_0_1px_0_oklch(1_0_0_/_0.18),0_1px_2px_oklch(0_0_0_/_0.08),0_6px_18px_-8px_oklch(0.7_0.19_45_/_0.45)]",
        outline:
          "border border-[color:var(--border)] bg-[color:var(--background)] text-[color:var(--foreground)] hover:bg-[color:var(--muted)]",
        ghost:
          "text-[color:var(--foreground)] hover:bg-[color:var(--muted)]",
        link:
          "text-[color:var(--foreground)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs rounded-md",
        lg: "h-11 px-6 text-[15px] rounded-lg",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
