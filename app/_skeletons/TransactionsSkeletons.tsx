import { Skeleton } from "@/components/ui/skeleton";

export function TransactionListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="border-grey-100 flex items-center justify-between gap-8 border-t pt-4 md:grid md:grid-cols-5"
        >
          {/* avatar and name and category(mobile) */}
          <div className="flex items-center gap-3 md:col-span-2">
            {/* avatar */}
            <Skeleton className="bg-grey-100 size-8 rounded-full md:size-10" />

            {/* name and category mobile */}
            <div className="flex flex-col gap-1 md:justify-self-center">
              <Skeleton className="bg-grey-100 h-4 w-24" /> {/* For name */}
              <Skeleton className="bg-grey-100 h-3 w-20 md:hidden" />{" "}
              {/* For category mobile */}
            </div>
          </div>
          <Skeleton className="bg-grey-100 hidden h-3 w-20 md:block md:justify-self-start" />{" "}
          {/* For category desktop */}
          <Skeleton className="bg-grey-100 hidden h-3 w-24 md:block md:justify-self-start" />{" "}
          {/* For date desktop */}
          {/* price and date (mobile) */}
          <div className="flex flex-col gap-1 md:justify-self-end">
            <Skeleton className="bg-grey-100 h-4 w-20" /> {/* For amount */}
            <Skeleton className="bg-grey-100 h-3 w-20 md:hidden" />{" "}
            {/* For date mobile */}
          </div>
        </div>
      ))}
    </div>
  );
}

export function PaginationSkeleton() {
  return (
    <div className="mt-11 flex items-center justify-between gap-4">
      {/* Prev button skeleton */}
      <div className="border-grey-200 flex size-10 items-center justify-center rounded-md sm:h-10 sm:w-20">
        <Skeleton className="bg-grey-100 h-8 w-5 sm:w-16" />
      </div>

      {/* Page numbers skeleton */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Desktop page numbers (hidden on mobile) */}
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            className="border-grey-200 hidden size-10 items-center justify-center rounded-md sm:flex"
          >
            <Skeleton className="bg-grey-100 h-8 w-8" />
          </div>
        ))}

        {/* Mobile current page (hidden on desktop) */}
        <div className="border-grey-200 flex size-10 items-center justify-center rounded-md sm:hidden">
          <Skeleton className="bg-grey-100 h-8 w-8" />
        </div>
      </div>

      {/* Next button skeleton */}
      <div className="border-grey-200 flex size-10 items-center justify-center rounded-md sm:h-10 sm:w-20">
        <Skeleton className="bg-grey-100 h-8 w-5 sm:w-16" />
      </div>
    </div>
  );
}
