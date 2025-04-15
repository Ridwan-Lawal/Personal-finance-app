type SpendingSummaryProps = {
  spendingSummary: {
    id: string | null;
    category: string | null;
    spent: number;
    colorTag: string | undefined;
    maxSpending: number | null;
  }[];
};

export default function BudgetSpendings({
  spendingSummary,
}: SpendingSummaryProps) {
  return (
    <div className="w-full space-y-6 md:w-[100%] lg:w-full">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-1">
        {spendingSummary.slice(0, 4).map((budget) => (
          <div key={budget?.id} className="">
            <div className="flex gap-4">
              <div className={`w-1 ${budget?.colorTag} `} />

              <div className="flex flex-col justify-between">
                <p className="text-preset-4 text-grey-500 capitalize">
                  {budget?.category}
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-preset-3 text-grey-900">
                    ${budget?.spent.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
