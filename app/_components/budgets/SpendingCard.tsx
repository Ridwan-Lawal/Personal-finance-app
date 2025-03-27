import { formatDate } from "@/app/_lib/helper";
import { transactions } from "@/app/_lib/supabase/server";
import Image from "next/image";

export default function SpendingCard({
  transaction,
}: {
  transaction: transactions;
}) {
  const image = transaction?.avatar?.split("/")?.slice(3, 5).join("/");

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-grow items-center gap-4">
        {/* avatar */}
        <div className="relative hidden size-8 overflow-hidden rounded-full md:block">
          <Image src={`/${image}`} alt="avatar" fill className="object-cover" />
        </div>

        {/* name on transaction */}
        <p className="text-preset-5-bold text-grey-900 capitalize">
          {transaction?.name}
        </p>
      </div>

      {/* transaction and data */}
      <div className="space-y-1 text-right">
        <p className="text-preset-5-bold text-grey-900">
          -${Math.abs(transaction?.amount ?? 0).toFixed(2)}
        </p>
        <p className="text-preset-5 text-grey-500">
          {formatDate(transaction?.created_at)}
        </p>
      </div>
    </div>
  );
}
