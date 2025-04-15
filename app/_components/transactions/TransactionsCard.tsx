import { formatDate } from "@/app/_lib/helper";
import { Tables } from "@/app/_lib/supabase/dbSchema";
import Image from "next/image";

export default async function TransactionsCard({
  transaction,
}: {
  transaction: Tables<"transactions">;
}) {
  const { avatar, name, category, created_at, amount } = transaction ?? {};

  const formattedAvatar = `/${avatar?.split("/").slice(3).join("/")}`;

  return (
    <div className="border-grey-100 flex items-center justify-between gap-8 border-t pt-4 md:grid md:grid-cols-5">
      {/* avatar and name and category(mobile) */}
      <div className="flex items-center gap-3 md:col-span-2">
        {/* avatar */}
        <div className="relative size-8 overflow-hidden rounded-full md:size-10">
          <Image
            src={formattedAvatar}
            alt="avatar"
            quality={100}
            priority={true}
            fill
            className="object-cover"
          />

          {/* <Image
            src={avatar ?? ""}
            alt="avatar"
            quality={100}
            placeholder={blurDataUrl ? "blur" : "empty"}
            blurDataURL={blurDataUrl}
            priority={true}
            fill
            className="object-cover"
          /> */}
        </div>

        {/* name and category mobile */}
        <div className="gap flex flex-col gap-1 md:justify-self-center">
          <p className="text-preset-4-bold text-grey-900 capitalize">{name}</p>
          <p className="text-preset-5 text-grey-500 capitalize md:hidden">
            {category ?? "N/A"}
          </p>
        </div>
      </div>

      <p className="text-preset-5 text-grey-500 hidden capitalize md:block md:justify-self-start">
        {category ?? "N/A"}
      </p>

      <p className="text-grey-500 text-preset-5 hidden md:block md:justify-self-start">
        {formatDate(created_at ?? "N/A")}
      </p>

      {/* price and date (mobile) */}
      <div className="flex flex-col gap-1 md:justify-self-end">
        <p className="text-preset-4-bold text-grey-900">
          {amount && amount > 0 ? (
            <span className="text-green">+${amount.toFixed(2)}</span>
          ) : (
            <span>-${amount && Math.abs(amount).toFixed(2)}</span>
          )}
        </p>
        <p className="text-grey-500 text-preset-5 md:hidden">
          {" "}
          {formatDate(created_at ?? "N/A")}
        </p>
      </div>
    </div>
  );
}
