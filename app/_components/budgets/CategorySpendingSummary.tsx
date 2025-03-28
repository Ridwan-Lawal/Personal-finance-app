type SpendingSummaryProps = {
  spendingSummary: {
    id: string | null;
    category: string | null;
    spent: number;
    colorTag: string | undefined;
    maxSpending: number | null;
  }[];
};

export default function CategorySpendingSummary({
  spendingSummary,
}: SpendingSummaryProps) {
  return (
    <div className="w-full space-y-6 border md:w-[50%] lg:w-full">
      <h2 className="text-preset-2 text-grey-900 capitalize">
        spending summary
      </h2>

      <div className="space-y-4">
        {spendingSummary.map((budget, budgetIndex) => (
          <div key={budget?.id} className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`h-7 w-[5px] ${budget?.colorTag} `} />
                <p className="text-preset-4 text-grey-500 capitalize">
                  {budget?.category}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-preset-3 text-grey-900">
                  ${budget?.spent.toFixed(2)}
                </p>
                <p className="text-preset-5 text-grey-500">
                  of ${budget?.maxSpending?.toFixed(2)}
                </p>
              </div>
            </div>

            {budgetIndex !== budgetIndex - 1 && (
              <div className="border-grey-100 border-b" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
