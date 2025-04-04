"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as React from "react";

import { cn } from "@/lib/utils";

interface CustomProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number;
  potTheme?: string | undefined;
}

function FormProgress({
  className,
  value,
  max,
  potTheme,
  ...props
}: CustomProgressProps) {
  const percentage = Math.min(((value ?? 0) / (max ?? 0)) * 100, 100);

  return (
    <div className="bg-beige-100 relative flex h-[8px] w-full items-center overflow-hidden rounded-sm">
      <ProgressPrimitive.Root
        data-slot="progress"
        className={cn(
          "bg-beige-100 relative flex h-[8px] w-full items-center gap-0.5 overflow-hidden rounded-sm",
          className,
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className={`${potTheme} h-full w-full flex-1 transition-all`}
          style={{
            transform: `translateX(-${100 - percentage}%)`,
          }}
        />
      </ProgressPrimitive.Root>
    </div>
  );
}

export { FormProgress };
