import { Skeleton } from "@/components/ui/skeleton";

export const RecurringSummarySkeleton = () => {
  return (
    <div className="flex flex-col gap-3 md:w-full md:flex-6 md:flex-row lg:w-[36%] lg:flex-col">
      {/* Total bills skeleton */}
      <div className="total-bills rounded-xl p-5 md:w-[50%] lg:w-full">
        {/* Icon placeholder */}
        <Skeleton className="bg-grey-100 mb-4 h-10 w-10 rounded-full" />

        <div className="space-y-[11px]">
          <Skeleton className="bg-grey-100 h-5 w-24" />{" "}
          {/* "Total bills" text */}
          <Skeleton className="bg-grey-100 h-8 w-32" /> {/* Amount */}
        </div>
      </div>

      {/* Summary skeleton */}
      <div className="space-y-5 rounded-xl bg-white p-5 md:w-[50%] lg:w-full">
        <Skeleton className="bg-grey-100 h-6 w-24" /> {/* "Summary" text */}
        <div className="space-y-4 bg-white">
          {/* First bill item */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="bg-grey-100 h-4 w-20" /> {/* Bill type */}
              <Skeleton className="bg-grey-100 h-4 w-28" /> {/* Bill price */}
            </div>
            <div className="border-grey-100 border-b" />
          </div>

          {/* Second bill item */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="bg-grey-100 h-4 w-32" /> {/* Bill type */}
              <Skeleton className="bg-grey-100 h-4 w-24" /> {/* Bill price */}
            </div>
            <div className="border-grey-100 border-b" />
          </div>

          {/* Third bill item */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="bg-grey-100 h-4 w-24" /> {/* Bill type */}
              <Skeleton className="bg-grey-100 h-4 w-28" /> {/* Bill price */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const RecurringTransactionListSkeleton = ({ itemCount = 3 }) => {
  // Create array with the number of items to display
  const skeletonItems = Array(itemCount).fill(null);

  return (
    <ul className="space-y-5">
      {skeletonItems.map((_, index) => (
        <li key={index} className="space-y-5">
          {/* BillCard Skeleton */}
          <div className="rounded-lg p-4">
            <div className="items-center space-y-2 md:flex md:items-center">
              {/* Avatar and name */}
              <div className="flex items-center gap-4 md:w-[55%]">
                <Skeleton className="bg-grey-100 size-8 rounded-full" />{" "}
                {/* Avatar */}
                <Skeleton className="bg-grey-100 h-5 w-32" /> {/* Name */}
              </div>

              {/* Monthly and price */}
              <div className="flex items-center justify-between md:w-[45%]">
                <div className="flex items-center gap-2">
                  <Skeleton className="bg-grey-100 h-4 w-36" />{" "}
                  {/* Monthly date text */}
                  <Skeleton className="bg-grey-100 h-4 w-4 rounded-full" />{" "}
                  {/* Status icon */}
                </div>
                <Skeleton className="bg-grey-100 h-5 w-16" /> {/* Price */}
              </div>
            </div>
          </div>

          {index !== itemCount - 1 && (
            <div className="border-grey-100 border-b" />
          )}
        </li>
      ))}
    </ul>
  );
};
