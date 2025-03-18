import TransactionFilterSort from "@/app/_components/transactions/TransactionFilterSort";
import TransactionFooter from "@/app/_components/transactions/TransactionFooter";
import TransactionHeader from "@/app/_components/transactions/TransactionHeader";
import Transactions from "@/app/_components/transactions/Transactions";
import TransactionSearch from "@/app/_components/transactions/TransactionSearch";
import { Metadata } from "@/app/_lib/metadata";
import { SearchParams } from "next/dist/server/request/search-params";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Transactions",
};

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const query = await searchParams;
  console.log(query);

  const suspenseKey = `${query?.["sort by"]}-${query?.category}-${query?.search}-${query?.page}`;

  return (
    <div className="space-y-8 px-4 py-6 md:px-10 md:py-8">
      <h1 className="text-preset-1 text-grey-900">Transactions</h1>

      {/* transactions body */}
      <div className="space-y-6 rounded-[12px] bg-white px-5 py-6 md:px-8 md:py-8">
        <div className="flex items-center justify-between gap-6">
          <TransactionSearch />
          <TransactionFilterSort />
        </div>
        <TransactionHeader />
        <Suspense fallback={<div>Loading...</div>} key={suspenseKey}>
          <Transactions query={query} />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <TransactionFooter />
        </Suspense>
      </div>
    </div>
  );
}
