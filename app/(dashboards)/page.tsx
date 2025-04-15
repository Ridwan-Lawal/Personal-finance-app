import BudgetsOverview from "@/app/_components/overview/BudgetsOverview";
import OverviewBalances from "@/app/_components/overview/OverviewBalances";
import PotsOverview from "@/app/_components/overview/PotsOverview";
import RecurringBillsOverview from "@/app/_components/overview/RecurringBillsOverview";
import TransactionsOverview from "@/app/_components/overview/TransactionsOverview";
import {
  BalanceCardsSkeleton,
  BudgetsOverviewSkeleton,
  PotsOverviewSkeleton,
  RecurringBillsOverviewSkeleton,
  TransactionsOverviewSkeleton,
} from "@/app/_skeletons/OverviewSkeletons";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="space-y-8 px-4 py-6 md:px-10 md:py-8">
      <h1 className="text-preset-1 text-grey-900 capitalize">overview</h1>
      <div className="space-y-8">
        <Suspense fallback={<BalanceCardsSkeleton />}>
          <OverviewBalances />
        </Suspense>

        <div className="overviews space-y-8 lg:space-y-0">
          <Suspense fallback={<PotsOverviewSkeleton />}>
            <PotsOverview />
          </Suspense>

          <Suspense fallback={<TransactionsOverviewSkeleton />}>
            <TransactionsOverview />
          </Suspense>

          <Suspense fallback={<BudgetsOverviewSkeleton />}>
            <BudgetsOverview />
          </Suspense>

          <Suspense fallback={<RecurringBillsOverviewSkeleton />}>
            <RecurringBillsOverview />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

// Add skeletons
// Add metadata
