import { Skeleton } from "@/components/ui/skeleton";

export const PotLoadingSkeleton = () => {
  // Create an array of 3 items to render multiple skeletons
  const skeletonItems = Array(3).fill(null);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {skeletonItems.map((_, index) => (
        <Skeleton
          key={index}
          className="relative space-y-8 rounded-xl bg-white px-4 py-5 md:px-6"
        >
          {/* Card header */}
          <div className="mb-3 flex items-center justify-between">
            <Skeleton className="bg-grey-100 h-6 w-32" />
          </div>

          {/* Total saved & balance */}
          <div className="mb-3 flex items-center justify-between">
            <Skeleton className="bg-grey-100 mb-1 h-4 w-24" />
            <Skeleton className="bg-grey-100 h-7 w-20" />
          </div>

          {/* Progress bar - full width with variable height */}
          <Skeleton className="bg-grey-100 mb-4 h-2 w-full" />

          {/* Progress */}
          <div className="mb-2 flex items-center justify-between">
            <Skeleton className="bg-grey-100 h-5 w-16" />
            <Skeleton className="bg-grey-100 h-5 w-28" />
          </div>

          {/* Buttons */}
          <div className="mt-8 flex space-x-2">
            <Skeleton className="bg-grey-100 h-12 w-full" />
            <Skeleton className="bg-grey-100 h-12 w-full" />
          </div>
        </Skeleton>
      ))}
    </div>
  );
};
