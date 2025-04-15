import BudgetOverview from "@/app/_components/budgets/BudgetOverview";
import LatestSpending from "@/app/_components/budgets/LatestSpending";
import Menu from "@/app/_components/budgets/Menu";
import { getColorStyles } from "@/app/_lib/helper";
import { budgets } from "@/app/_lib/supabase/server";
import { BudgetProgressSkeleton } from "@/app/_skeletons/BudgetSkeletons";
import { Suspense } from "react";

export default function CategoryCard({ budget }: { budget: budgets }) {
  return (
    <div className="relative space-y-5 rounded-[12px] bg-white px-5 py-6 md:px-8">
      {/* haader */}
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className={`${getColorStyles(budget?.colorTag)} size-4 rounded-full`}
          />
          <h3 className="text-preset-2 text-grey-900 capitalize">
            {" "}
            {budget?.category}
          </h3>
        </div>

        {/* menu and dropdown */}
        <Menu budgetCategory={budget?.category} budgetId={budget?.id} />
      </div>

      {/* ======== Budget Overview ======= */}
      <Suspense fallback={<BudgetProgressSkeleton />}>
        <BudgetOverview budget={budget} />
      </Suspense>

      {/* latest spending */}
      <LatestSpending budgetCategory={budget?.category} />
    </div>
  );
}

// charts
