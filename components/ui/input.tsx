/** @format */

import React from "react";
import { cn } from "@/lib/utils";

type InputProps = React.ComponentProps<"input"> & {
  error?: string;
};

export function Input({ className, type, error, ...props }: InputProps) {
  return (
    <div className="flex flex-col space-y-1">
      <input
        type={type}
        aria-invalid={!!error}
        data-slot="input"
        className={cn(
          // Placeholder, file text, and selection colors
          "placeholder:text-[var(--text-muted)] file:text-[var(--foreground)]",
          "selection:bg-[var(--primary-color)] selection:text-[var(--button-text-primary)]",

          // Base colors and border
          "bg-[var(--background)] text-[var(--text)] border border-[var(--input-border)]",

          // Sizing and layout
          "flex h-9 w-full min-w-0 rounded-md px-3 py-1 text-base md:text-sm shadow-xs",

          // Transition & state handling
          "transition-[color,box-shadow] outline-none",

          // File input style
          "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",

          // Disabled state
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",

          // Focus & invalid states
          "focus-visible:border-[var(--input-focus)] focus-visible:ring-[var(--input-focus)] focus-visible:ring-1",
          "aria-invalid:border-[var(--error)] aria-invalid:ring-[var(--error)]",

          // Optional manual error fallback
          error && "border-[var(--error)] ring-[var(--error)]",

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
