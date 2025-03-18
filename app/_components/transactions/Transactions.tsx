import TransactionsCard from "@/app/_components/transactions/TransactionsCard";
import { getTransactions } from "@/app/_lib/data-service";
import { SearchParams } from "next/dist/server/request/search-params";

export default async function Transactions({ query }: { query: SearchParams }) {
  const transactions = await getTransactions({
    category: query?.category,
    search: query?.search,
    sortBy: query?.["sort by"],
    page: (query?.page as string | undefined) ?? "1",
  });

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
