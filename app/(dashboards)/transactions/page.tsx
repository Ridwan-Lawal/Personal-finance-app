import TransactionBody from "@/app/_components/transactions/TransactionBody";
import { Metadata } from "@/app/_lib/metadata";

export const metadata: Metadata = {
  title: "Transactions",
};

export default function Page() {
  return (
    <div className="space-y-8 px-4 py-6 md:px-10 md:py-8">
      <h1 className="text-preset-1 text-grey-900">Transactions</h1>

      {/* transactions body */}
      <TransactionBody />
    </div>
  );
}
