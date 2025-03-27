import { getTransactionByCategory } from "@/app/_lib/data-service";
import { getColorStyles } from "@/app/_lib/helper";
import { budgets } from "@/app/_lib/supabase/server";
import { Progress } from "@/components/ui/progress";

export default async function BudgetOverview({ budget }: { budget: budgets }) {
  // Transactions for each budget category
  const categoryTransactions = await getTransactionByCategory(budget?.category);

  // Spent - which is the money spent within the category for the current month.
  const spent = categoryTransactions
    ?.filter((transaction) => {
      if (transaction && transaction.amount) {
        return (
          new Date(transaction?.created_at)?.getMonth() ===
            new Date(Date.now())?.getMonth() && transaction?.amount < 0
        );
      }
    })
    .reduce(
      (acc, curTransaction) =>
        curTransaction?.amount
          ? acc + Math.abs(curTransaction?.amount)
          : acc + 0,
      0,
    );

  return (
    <div className="space-y-4 border">
      <p className="text-preset-4 text-grey-500">
        Maximum of ${budget?.maxSpending?.toFixed(2)}
      </p>

      {/* progress bar */}
      <Progress
        value={spent}
        max={budget?.maxSpending as number | undefined}
        budgetColorTag={getColorStyles(budget?.colorTag)}
      />

      {/* spent and free */}

      <div className="flex items-center gap-4">
        {/* spent */}
        <div className="flex w-1/2 gap-4">
          <div
            className={`${getColorStyles(budget?.colorTag)} w-[5px] border`}
          />
          <div className="flex flex-col gap-1">
            <p className="text-preset-5 text-grey-500">Spent</p>

            <p className="text-preset-4-bold text-grey-900">
              ${spent?.toFixed(2)}
            </p>
          </div>
        </div>

        {/* free */}
        <div className="border-beige-100 flex w-1/2 flex-col gap-1 border-l-4 px-4">
          <p className="text-preset-5 text-grey-500">Remaining</p>

          <p className="text-preset-4-bold text-grey-900">
            $
            {budget?.maxSpending && spent
              ? (budget?.maxSpending - spent).toFixed(2)
              : "N / A"}
          </p>
        </div>
      </div>
    </div>
  );
}
