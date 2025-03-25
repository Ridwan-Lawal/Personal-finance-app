import CategorySpendingSummary from "@/app/_components/budgets/CategorySpendingSummary";
import { Component } from "@/app/_components/budgets/ChartsSummary";

export default function SpendingSummary() {
  return (
    <div className="flex w-full flex-grow flex-col items-center gap-8 rounded-[12px] border bg-white px-5 py-6 md:flex-row md:justify-center md:px-8 md:py-8 lg:w-[42%] lg:flex-col">
      <Component />
      <CategorySpendingSummary />
    </div>
  );
}
