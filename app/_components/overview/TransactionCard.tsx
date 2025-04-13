import { formatDate } from "@/app/_lib/helper";
import { transactions } from "@/app/_lib/supabase/server";
import Image from "next/image";

export default function TransactionCard({
  transaction,
}: {
  transaction: transactions;
}) {
  const { avatar, name, amount, date } = transaction ?? {};

  const formattedAvatar = `/${avatar?.split("/").slice(3).join("/")}`;

  return (
    <div className="flex items-center justify-between">
      {/* avatar and name */}
      <div className="flex items-center gap-4">
        <div className="relative size-8 overflow-hidden rounded-full md:size-10">
          <Image
            src={formattedAvatar}
            alt="avatar"
            fill
            className="object-cover"
          />
        </div>
        <p className="text-preset-4-bold text-grey-900 capitalize">{name}</p>
      </div>

      {/* price and date */}
      <div className="space-y-2 text-right">
        <p
          className={`text-preset-4-bold ${amount && amount < 0 ? "text-red" : "text-green"}`}
        >
          {amount && amount < 0
            ? `-$${Math.abs(amount).toFixed(2)}`
            : `+$${amount?.toFixed(2)}`}
        </p>
        <p className="text-preset-5 text-grey-500">{formatDate(date)}</p>
      </div>
    </div>
  );
}
