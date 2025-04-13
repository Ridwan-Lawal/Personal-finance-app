import { ChartsSummary } from "@/app/_components/budgets/ChartsSummary";
import BudgetSpendings from "@/app/_components/overview/BudgetSpending";
import { getBudgets, getTransactionByCategory } from "@/app/_lib/data-service";
import {
  getColorStyles,
  getColorVariable,
  totalSpentForEachBudget,
} from "@/app/_lib/helper";
import { Chevron } from "@/app/_ui/NavIcons";
import { ChartConfig } from "@/components/ui/chart";
import Link from "next/link";

export default async function BudgetsOverview() {
  const budgets = await getBudgets();

  const transactionsForEachCategory = await Promise.all(
    budgets?.map((budget) => getTransactionByCategory(budget?.category)),
  );

  const chartData = budgets?.map((budget) => ({
    category: budget?.category,
    spent: totalSpentForEachBudget(transactionsForEachCategory, budget),
    fill: getColorVariable(budget?.colorTag),
  }));

  const chartConfig = budgets.reduce(
    (config, curBudget) => {
      config[curBudget?.category || ""] = {
        label: curBudget?.category as string,
        color: getColorVariable(curBudget?.colorTag) as string,
      };

      return config;
    },
    {} as Record<string, { label: string; color: string }>,
  ) satisfies ChartConfig;

  const spendingSummary = budgets?.map((budget) => ({
    id: budget?.id,
    category: budget?.category,
    spent: totalSpentForEachBudget(transactionsForEachCategory, budget),
    colorTag: getColorStyles(budget?.colorTag),
    maxSpending: budget?.maxSpending,
  }));

  return (
    <div className="budgets-overview w-full items-center rounded-[12px] border bg-white px-5 py-6 drop-shadow-sm md:flex-row md:justify-center md:space-y-5 md:px-8 md:py-8 lg:order-2 lg:space-y-0">
      <header className="flex w-full items-center justify-between border">
        <h2 className="text-preset-2 text-grey-900 capitalize">budgets</h2>

        <Link href={"/budgets"}>
          <button className="text-preset-4 flex cursor-pointer items-center gap-3">
            <span className="text-grey-500 capitalize">see details</span>
            <Chevron className="text-grey-500 size-3" />
          </button>
        </Link>
      </header>

      {budgets?.length ? (
        <div className="w-full md:flex md:items-center lg:flex lg:flex-col xl:flex-row">
          <div className="flex-grow">
            <ChartsSummary
              budgets={budgets}
              chartData={chartData}
              chartConfig={chartConfig}
            />
          </div>

          <div className="md:w-[25%] lg:w-full">
            <BudgetSpendings spendingSummary={spendingSummary} />
          </div>
        </div>
      ) : (
        <div className="bg-beige-100 mt-4 flex h-[120px] items-center justify-center rounded-xl">
          <p className="text-grey-900 text-lg font-medium">
            Add new budgets{" "}
            <Link href="/budgets" className="underline">
              here.
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
