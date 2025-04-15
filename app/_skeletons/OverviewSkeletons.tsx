import { Skeleton } from "@/components/ui/skeleton";

export function BalanceCardsSkeleton() {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
      {[1, 2, 3].map((index) => (
        <Skeleton
          key={index}
          className={`${index === 1 ? "bg-grey-900" : "bg-white"} w-full space-y-3 rounded-xl p-5 shadow-md shadow-gray-200 md:p-6`}
        >
          <Skeleton className="bg-grey-100 h-4 w-24" />
          <Skeleton className="bg-grey-100 h-8 w-32" />
        </Skeleton>
      ))}
    </div>
  );
}

export function PotsOverviewSkeleton() {
  return (
    <Skeleton className="pots-overview space-y-5 rounded-xl bg-white px-5 py-6 drop-shadow-sm md:px-8">
      {/* header */}
      <header className="flex items-center justify-between">
        <Skeleton className="bg-grey-100 h-6 w-24" />
        <Skeleton className="bg-grey-100 h-4 w-28" />
      </header>

      <div className="flex flex-col gap-5 md:flex-row">
        <Skeleton className="bg-beige-100 flex gap-4 rounded-xl p-4 md:w-full">
          <Skeleton className="bg-grey-100 h-12 w-12 rounded-full" />{" "}
          {/* For the image */}
          <div className="space-y-3">
            <Skeleton className="bg-grey-100 h-4 w-24" />{" "}
            {/* For "total saved" text */}
            <Skeleton className="bg-grey-100 h-7 w-32" /> {/* For the amount */}
          </div>
        </Skeleton>

        <footer className="grid grid-cols-2 gap-4 md:w-full">
          {[1, 2, 3, 4].map((index) => (
            <div className="flex items-start gap-4" key={index}>
              <div className="h-10 w-1 bg-gray-200" />{" "}
              {/* Colored stripe placeholder */}
              <div className="space-y-1">
                <Skeleton className="bg-grey-100 h-3 w-20" />{" "}
                {/* For pot name */}
                <Skeleton className="bg-grey-100 h-5 w-16" />{" "}
                {/* For pot amount */}
              </div>
            </div>
          ))}
        </footer>
      </div>
    </Skeleton>
  );
}

export function TransactionsOverviewSkeleton() {
  return (
    <div className="transactions-overview h-fit space-y-8 rounded-xl bg-white px-5 py-6 drop-shadow-sm md:px-8 lg:order-3 lg:col-span-3">
      <header className="flex items-center justify-between">
        <Skeleton className="bg-grey-100 h-6 w-28" />{" "}
        {/* For "transactions" title */}
        <Skeleton className="bg-grey-100 h-4 w-20" />{" "}
        {/* For "view all" button */}
      </header>

      <main className="space-y-3 lg:space-y-4">
        {[1, 2, 3, 4, 5].map((index) => (
          <div key={index} className="space-y-3 lg:space-y-4">
            <div className="flex items-center justify-between">
              {/* avatar and name */}
              <div className="flex items-center gap-4">
                <Skeleton className="bg-grey-100 size-8 rounded-full md:size-10" />{" "}
                {/* For avatar */}
                <Skeleton className="bg-grey-100 h-4 w-32" /> {/* For name */}
              </div>

              {/* price and date */}
              <div className="space-y-2 text-right">
                <Skeleton className="bg-grey-100 ml-auto h-4 w-16" />{" "}
                {/* For amount */}
                <Skeleton className="bg-grey-100 ml-auto h-3 w-20" />{" "}
                {/* For date */}
              </div>
            </div>

            {index !== 5 && <div className="border-grey-100 border-b" />}
          </div>
        ))}
      </main>
    </div>
  );
}

export function BudgetsOverviewSkeleton() {
  return (
    <div className="budgets-overview w-full items-center rounded-[12px] bg-white px-5 py-6 drop-shadow-sm md:flex-row md:justify-center md:space-y-5 md:px-8 md:py-8 lg:order-2 lg:space-y-6">
      <header className="flex w-full items-center justify-between">
        <Skeleton className="bg-grey-100 h-6 w-24 rounded-md" />
        <Skeleton className="bg-grey-100 h-5 w-28 rounded-md" />
      </header>

      <div className="w-full gap-12 md:flex md:items-center lg:flex lg:flex-col xl:flex-row">
        <div className="flex-grow">
          <div className="flex h-fit flex-col">
            <div className="-my-8 min-h-fit flex-1 pb-0">
              <div className="mx-auto aspect-square h-[293px] w-[293px]">
                <Skeleton className="bg-grey-100 h-full w-full rounded-full" />
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-[25%] lg:w-full">
          <div className="w-full space-y-6 md:w-[100%] lg:w-full">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-1">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="bg-grey-100 h-10 w-1" />
                  <div className="flex flex-col justify-between gap-2">
                    <Skeleton className="bg-grey-100 h-4 w-20" />
                    <Skeleton className="bg-grey-100 h-5 w-16" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RecurringBillsOverviewSkeleton() {
  return (
    <div className="recurring-bills-overview space-y-8 rounded-xl bg-white px-5 py-6 md:px-8 md:py-8 lg:order-5">
      <header className="flex w-full items-center justify-between">
        <Skeleton className="bg-grey-100 h-6 w-40" />{" "}
        {/* For "recurring bills" title */}
        <Skeleton className="bg-grey-100 h-4 w-28" />{" "}
        {/* For "see details" button */}
      </header>

      <main className="space-y-3">
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="bg-beige-100 flex overflow-hidden rounded-lg"
          >
            <div className="bg-grey-200 w-1" />{" "}
            {/* Colored border placeholder */}
            <div className="flex flex-grow items-center justify-between px-4 py-5">
              <Skeleton className="bg-grey-100 h-4 w-24" />{" "}
              {/* For bill type */}
              <Skeleton className="bg-grey-100 h-4 w-20" /> {/* For amount */}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
