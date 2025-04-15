import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function BudgetsSummarySkeleton() {
  return (
    <div className="lg:w-[42%]">
      <div className="flex w-full flex-grow flex-col items-center gap-8 rounded-xl bg-white px-5 py-6 md:flex-row md:justify-center md:px-8 md:py-8 lg:w-full lg:flex-col">
        <Card className="flex h-fit flex-col">
          <CardContent className="-my-8 min-h-fit flex-1 pb-0">
            <div className="mx-auto flex aspect-square h-[293px] max-h-fit w-[293px] items-center justify-center">
              {/* Donut chart skeleton */}
              <div className="relative">
                <Skeleton className="bg-grey-100 size-[293px] rounded-full" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Skeleton className="bg-grey-100 mb-2 h-8 w-24" />{" "}
                  {/* For center amount */}
                  <Skeleton className="bg-grey-100 h-4 w-32" />{" "}
                  {/* For "of $X limit" text */}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="w-full space-y-6 md:w-[50%] lg:w-full">
          <Skeleton className="bg-grey-100 h-6 w-40" />{" "}
          {/* For "spending summary" heading */}
          <div className="space-y-4">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-grey-200 h-7 w-[5px]" />{" "}
                    {/* Color tag placeholder */}
                    <Skeleton className="bg-grey-100 h-4 w-24" />{" "}
                    {/* For category name */}
                  </div>

                  <div className="flex items-center gap-2">
                    <Skeleton className="bg-grey-100 h-6 w-16" />{" "}
                    {/* For spent amount */}
                    <Skeleton className="bg-grey-100 h-3 w-24" />{" "}
                    {/* For "of $X" text */}
                  </div>
                </div>

                {index !== 4 && <div className="border-grey-100 border-b" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function BudgetProgressSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="bg-grey-100 h-4 w-40" />{" "}
      {/* For maximum spending text */}
      {/* progress bar skeleton */}
      <div className="bg-beige-100 relative h-8 w-full overflow-hidden rounded-sm px-1 py-1">
        <div className="bg-beige-100 relative flex h-6 w-full items-center gap-1 overflow-hidden rounded-sm">
          <Skeleton className="bg-grey-100 h-full w-3/4" />{" "}
          {/* For progress indicator */}
        </div>
      </div>
      {/* spent and free */}
      <div className="flex items-center gap-4">
        {/* spent */}
        <div className="flex w-1/2 gap-4">
          <div className="bg-grey-200 w-[5px]" /> {/* Color tag placeholder */}
          <div className="flex flex-col gap-1">
            <Skeleton className="bg-grey-100 h-3 w-12" />{" "}
            {/* For "Spent" label */}
            <Skeleton className="bg-grey-100 h-4 w-20" />{" "}
            {/* For spent amount */}
          </div>
        </div>

        {/* free/remaining */}
        <div className="border-beige-100 flex w-1/2 flex-col gap-1 border-l-4 px-4">
          <Skeleton className="bg-grey-100 h-3 w-20" />{" "}
          {/* For "Remaining" label */}
          <Skeleton className="bg-grey-100 h-4 w-20" />{" "}
          {/* For remaining amount */}
        </div>
      </div>
    </div>
  );
}

export function BudgetDetailSkeleton({ count = 2 }) {
  return (
    <div className="flex flex-grow flex-col gap-6 lg:w-[60%]">
      {Array.from({ length: count }).map((_, budgetIndex) => (
        <div
          key={budgetIndex}
          className="relative space-y-5 rounded-xl bg-white px-5 py-6 md:px-8"
        >
          {/* header */}
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="bg-grey-100 size-4 rounded-full" />{" "}
              {/* For color dot */}
              <Skeleton className="bg-grey-100 h-6 w-32" />{" "}
              {/* For category name */}
            </div>

            {/* menu placeholder */}
            <Skeleton className="bg-grey-100 h-8 w-8 rounded-full" />
          </div>

          {/* Budget Progress */}
          <div className="space-y-4">
            <Skeleton className="bg-grey-100 h-4 w-40" />{" "}
            {/* For maximum spending text */}
            {/* progress bar skeleton */}
            <div className="bg-beige-100 relative h-8 w-full overflow-hidden rounded-sm px-1 py-1">
              <div className="bg-beige-100 relative flex h-6 w-full items-center gap-1 overflow-hidden rounded-sm">
                <Skeleton className="bg-grey-100 h-full w-3/4" />{" "}
                {/* For progress indicator */}
              </div>
            </div>
            {/* spent and free */}
            <div className="flex items-center gap-4">
              {/* spent */}
              <div className="flex w-1/2 gap-4">
                <div className="bg-grey-200 w-[5px]" />{" "}
                {/* Color tag placeholder */}
                <div className="flex flex-col gap-1">
                  <Skeleton className="bg-grey-100 h-3 w-12" />{" "}
                  {/* For "Spent" label */}
                  <Skeleton className="bg-grey-100 h-4 w-20" />{" "}
                  {/* For spent amount */}
                </div>
              </div>

              {/* free/remaining */}
              <div className="border-beige-100 flex w-1/2 flex-col gap-1 border-l-4 px-4">
                <Skeleton className="bg-grey-100 h-3 w-20" />{" "}
                {/* For "Remaining" label */}
                <Skeleton className="bg-grey-100 h-4 w-20" />{" "}
                {/* For remaining amount */}
              </div>
            </div>
          </div>

          {/* Latest spending */}
          <div className="bg-beige-100 space-y-5 rounded-xl p-4">
            {/* header */}
            <div className="flex items-center justify-between">
              <Skeleton className="bg-grey-100 h-6 w-32" />{" "}
              {/* For "latest spending" heading */}
              <Skeleton className="bg-grey-100 h-4 w-16" />{" "}
              {/* For "see all" button */}
            </div>

            {/* spendings */}
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, transactionIndex) => (
                <div key={transactionIndex} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-grow items-center gap-4">
                      {/* avatar */}
                      <Skeleton className="bg-grey-100 relative hidden size-8 rounded-full md:block" />

                      {/* name on transaction */}
                      <Skeleton className="bg-grey-100 h-4 w-24" />
                    </div>

                    {/* transaction and date */}
                    <div className="space-y-1 text-right">
                      <Skeleton className="bg-grey-100 ml-auto h-4 w-16" />
                      <Skeleton className="bg-grey-100 ml-auto h-3 w-20" />
                    </div>
                  </div>

                  {/* border divider */}
                  {transactionIndex !== 2 && (
                    <Skeleton className="border-b border-gray-100" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
