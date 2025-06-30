/** @format */

"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/lib/utils";

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        // Base label styling
        "flex items-center gap-2 text-sm leading-none font-medium select-none",

        // Custom text color
        "text-[var(--text)]",

        // Disabled state support (via data-* and peer)
        "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",

        // Optional support for error or custom state via props
        props["aria-invalid"] && "text-[var(--error)]",

        className
      )}
      {...props}
    />
  );
}

export { Label };
