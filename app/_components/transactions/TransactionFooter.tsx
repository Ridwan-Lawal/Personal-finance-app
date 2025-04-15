import TransactionsPagination from "@/app/_components/transactions/TransactionsPagination";
import { getTransactions } from "@/app/_lib/data-service";
import { Query } from "@/app/_lib/types";

export default async function TransactionFooter({ query }: Query) {
  const { totalTransactions } = await getTransactions(query);


  return <TransactionsPagination totalTransactionsFromDB={totalTransactions} />;
}
