import TransactionCard from "@/app/_components/overview/TransactionCard";
import { overviewTransactions } from "@/app/_lib/data-service";
import { Chevron } from "@/app/_ui/NavIcons";
import Link from "next/link";

export default async function TransactionsOverview() {
  const transactions = await overviewTransactions();

  return (
    <div className="transactions-overview h-fit space-y-8 rounded-xl border bg-white px-5 py-6 drop-shadow-sm md:px-8 lg:order-3 lg:col-span-3">
      <header className="flex items-center justify-between">
        <h2 className="text-preset-2 text-grey-900 capitalize">transactions</h2>

        <Link href={"/transactions"}>
          <button className="text-preset-4 flex cursor-pointer items-center gap-3">
            <span className="text-grey-500 capitalize">view all</span>
            <Chevron className="text-grey-500 size-3" />
          </button>
        </Link>
      </header>

      <main className="space-y-3 lg:space-y-4">
        {transactions?.slice(0, 5)?.map((transaction, index, arr) => (
          <div key={transaction?.id} className="space-y-3 lg:space-y-4">
            <TransactionCard transaction={transaction} />

            {index !== arr.length - 1 && (
              <div className="border-grey-100 border-b" />
            )}
          </div>
        ))}
      </main>
    </div>
  );
}

// work on the grid
