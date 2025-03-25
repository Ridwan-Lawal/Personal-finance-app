import BudgetOverview from "@/app/_components/budgets/BudgetOverview";
import LatestSpending from "@/app/_components/budgets/LatestSpending";
import Menu from "@/app/_components/budgets/Menu";

export default function CategoryCard() {
  return (
    <div className="relative space-y-5 rounded-[12px] border bg-white px-5 py-6 md:px-8">
      {/* haader */}
      <div className="flex w-full items-center justify-between border">
        <div className="flex items-center gap-4">
          <div className="bg-green size-4 rounded-full" />
          <h3 className="text-preset-2 text-grey-900 capitalize">
            {" "}
            Entertainment
          </h3>
        </div>

        {/* menu and dropdown */}
        <Menu />
      </div>

      {/* ======== Budget Overview ======= */}
      <BudgetOverview />

      {/* latest spending */}
      <LatestSpending />
    </div>
  );
}
