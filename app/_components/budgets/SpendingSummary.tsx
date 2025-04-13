import CategorySpendingSummary from "@/app/_components/budgets/CategorySpendingSummary";
import { ChartsSummary } from "@/app/_components/budgets/ChartsSummary";
import { getBudgets, getTransactionByCategory } from "@/app/_lib/data-service";
import {
  getColorStyles,
  getColorVariable,
  totalSpentForEachBudget,
} from "@/app/_lib/helper";
import { ChartConfig } from "@/components/ui/chart";

export default async function SpendingSummary() {
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
    <div>
      {budgets?.length ? (
        <div className="flex w-full flex-grow flex-col items-center gap-8 rounded-[12px] border bg-white px-5 py-6 md:flex-row md:justify-center md:px-8 md:py-8 lg:w-[42%] lg:flex-col">
          <ChartsSummary
            budgets={budgets}
            chartData={chartData}
            chartConfig={chartConfig}
          />
          <CategorySpendingSummary spendingSummary={spendingSummary} />
        </div>
      ) : (
        <div className="mt-4 flex h-[120px] items-center justify-center rounded-xl">
          <p className="text-grey-900 text-lg font-medium">
            Add new budgets to get started.
          </p>
        </div>
      )}
    </div>
  );
}
