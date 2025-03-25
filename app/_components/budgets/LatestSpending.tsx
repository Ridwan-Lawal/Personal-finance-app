import SpendingCard from "@/app/_components/budgets/SpendingCard";
import { Chevron } from "@/app/_ui/NavIcons";

export default function LatestSpending() {
  return (
    <div className="bg-beige-100 space-y-5 rounded-[12px] p-4">
      {/* header */}
      <div className="flex items-center justify-between">
        <h3 className="text-preset-3 text-grey-900 capitalize">
          latest spending
        </h3>

        <div className="flex items-center gap-3">
          <p className="text-preset-4 text-grey-500 capitalize">see all</p>
          <Chevron className="h-[5px] w-2" />
        </div>
      </div>

      {/* spendings */}
      <div className="space-y-3">
        {/* spendings card */}

        {Array.from({ length: 3 }, (_, i) => i + 1).map(
          (transaction, transactionIndex, transactionsArr) => (
            <>
              <SpendingCard key={transactionIndex} />
              {/* if current index (item) is not the last index (item) */}
              {transactionIndex !== transactionsArr.length - 1 && (
                <div className="text-grey-500 border-b" />
              )}
            </>
          ),
        )}
      </div>
    </div>
  );
}
