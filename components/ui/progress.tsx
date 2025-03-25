"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as React from "react";

import { cn } from "@/lib/utils";

interface CustomProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number;
  indicatorClassName?: string;
}

function Progress({
  className,
  value,
  indicatorClassName,
  ...props
}: CustomProgressProps) {
  return (
    <div className="bg-beige-100 relative flex h-8 w-full items-center overflow-hidden rounded-sm px-1 py-1">
      <ProgressPrimitive.Root
        data-slot="progress"
        className={cn(
          "bg-beige-100 relative h-6 w-full overflow-hidden rounded-sm",
          className,
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className={`${indicatorClassName} h-full w-full flex-1 transition-all`}
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
      </ProgressPrimitive.Root>
    </div>
  );
}

export { Progress };
