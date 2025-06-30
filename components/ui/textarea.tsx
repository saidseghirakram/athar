/** @format */

import * as React from "react";
import { cn } from "@/lib/utils";

type TextareaProps = React.ComponentProps<"textarea"> & {
  error?: string;
};

function Textarea({ className, error, ...props }: TextareaProps) {
  return (
    <div className="flex flex-col space-y-1">
      <textarea
        data-slot="textarea"
        aria-invalid={!!error}
        className={cn(
          // Color system
          "bg-[var(--background)] text-[var(--text)] placeholder:text-[var(--text-muted)] border border-[var(--input-border)]",

          // Focus & validation states
          "focus-visible:border-[var(--input-focus)] focus-visible:ring-[var(--input-focus)] focus-visible:ring-1",
          "aria-invalid:border-[var(--error)] aria-invalid:ring-[var(--error)]",
          error && "border-[var(--error)] ring-[var(--error)]",

          // Layout & sizing
          "flex field-sizing-content min-h-16 w-full rounded-md px-3 py-2 text-base md:text-sm shadow-xs",

          // Interaction & transitions
          "transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50",

          className
        )}
        {...props}
      />
      {error && (
        <p className="text-[10px] text-[var(--error)]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export { Textarea };
