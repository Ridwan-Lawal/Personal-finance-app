import SeeAll from "@/app/_components/budgets/SeeAll";
import SpendingCard from "@/app/_components/budgets/SpendingCard";
import { getTransactionByCategory } from "@/app/_lib/data-service";

export default async function LatestSpending({
  budgetCategory,
}: {
  budgetCategory: string | null;
}) {
  const categoryTransactions = await getTransactionByCategory(budgetCategory);

  const latestSpending = categoryTransactions
    ?.filter((transaction) => {
      if (transaction?.amount) {
        return transaction?.amount < 0;
      }
    })
    ?.slice(0, 3);

  return (
    <div className="bg-beige-100 space-y-5 rounded-[12px] p-4">
      {/* header */}
      <div className="flex items-center justify-between">
        <h3 className="text-preset-3 text-grey-900 capitalize">
          latest spending
        </h3>

        <SeeAll budgetCategory={budgetCategory} />
      </div>

      {/* spendings */}
      <div className="space-y-3">
        {/* spendings card */}

        {latestSpending?.map(
          (transaction, transactionIndex, transactionsArr) => (
            <div key={transaction?.id} className="space-y-3">
              <SpendingCard key={transactionIndex} transaction={transaction} />
              {/* if current index (item) is not the last index (item) */}
              {transactionIndex !== transactionsArr.length - 1 && (
                <div className="border-b border-gray-300" />
              )}
            </div>
          ),
        )}
      </div>
    </div>
  );
}
