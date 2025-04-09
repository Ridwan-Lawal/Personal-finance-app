import { addDateWithSuffixes } from "@/app/_lib/helper";
import { transactions } from "@/app/_lib/supabase/server";
import dueIcon from "@/public/icon-bill-due.svg";
import checkIcon from "@/public/icon-bill-paid.svg";

import Image from "next/image";

interface Transaction extends transactions {
  paid: boolean;
  dueSoon?: boolean;
}

export default function BillCard({
  transaction,
}: {
  transaction: Transaction;
}) {
  const { paid, name, dueSoon, amount, date, avatar } = transaction ?? {};

  const formattedAvatar = `/${avatar?.split("/").slice(3).join("/")}`;

  return (
    <div className="items-center space-y-2 md:flex md:items-center">
      {/* avatar and name */}
      <div className="flex items-center gap-4 md:w-[55%]">
        <div className="relative size-8 overflow-hidden rounded-full">
          <Image
            src={formattedAvatar}
            alt="avatar"
            priority={true}
            fill
            className="object-cover"
          />
        </div>

        <p className="text-preset-4-bold text-grey-900 capitalize">{name}</p>
      </div>

      {/* monthly and price */}
      <div className="flex items-center justify-between md:w-[45%]">
        <div className="flex items-center gap-2">
          <p className="text-preset-5 text-green capitalize">
            monthly - {addDateWithSuffixes(date) ?? "N / A"}
          </p>
          {(paid || dueSoon) && (
            <Image
              src={paid ? checkIcon : dueIcon}
              alt="check"
              priority={true}
            />
          )}
        </div>

        <p
          className={`text-preset-4-bold ${dueSoon ? "text-red" : "text-grey-900"}`}
        >
          ${amount ? Math.abs(amount).toFixed(2) : 0}
        </p>
      </div>
    </div>
  );
}
