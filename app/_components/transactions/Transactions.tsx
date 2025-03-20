import TransactionsCard from "@/app/_components/transactions/TransactionsCard";
import { getTransactions } from "@/app/_lib/data-service";
import { Query } from "@/app/_lib/types";

export default async function Transactions({ query }: Query) {
  const { transactions } = await getTransactions(query);

  console.log(transactions);

  if (!transactions?.length) {
    return (
      <h2 className="text-preset-3 text-grey-900 text-center italic">
        No Transaction available for this query :(
      </h2>
    );
  }

  return (
    <div className="space-y-4">
      {transactions?.map((transaction) => (
        <TransactionsCard key={transaction?.id} transaction={transaction} />
      ))}
    </div>
  );
}
