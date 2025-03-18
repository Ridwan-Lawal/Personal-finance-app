import TransactionsPagination from "@/app/_components/transactions/TransactionsPagination";
import { getTotalTranactionsFromDB } from "@/app/_lib/data-service";

export default async function TransactionFooter() {
  const totalTransactions = await getTotalTranactionsFromDB();

  return <TransactionsPagination totalTransactionsFromDB={totalTransactions} />;
}
