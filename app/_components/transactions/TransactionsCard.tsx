import avatar from "@/public/avatars/aqua-flow-utilities.jpg";
import Image from "next/image";

export default function TransactionsCard() {
  return (
    <div className="border-grey-100 flex items-center justify-between gap-8 border-t pt-4 md:grid md:grid-cols-5">
      {/* avatar and name and category(mobile) */}
      <div className="flex items-center gap-3 md:col-span-2">
        {/* avatar */}
        <div className="relative size-8 overflow-hidden rounded-full md:size-10">
          <Image
            src={avatar}
            alt="avatar"
            quality={100}
            placeholder="blur"
            priority={true}
            fill
            className="object-cover"
          />
        </div>

        {/* name and category mobile */}
        <div className="gap flex flex-col gap-1 md:justify-self-center">
          <p className="text-preset-4-bold text-grey-900 capitalize">
            Bravo Zen Spa
          </p>
          <p className="text-preset-5 text-grey-500 capitalize md:hidden">
            Personal care
          </p>
        </div>
      </div>

      <p className="text-preset-5 text-grey-500 capitalize md:justify-self-start">
        Personal care
      </p>

      <p className="text-grey-500 text-preset-5 md:justify-self-start">
        20 Aug 2024
      </p>

      {/* price and date (mobile) */}
      <div className="flex flex-col gap-1 md:justify-self-end">
        <p className="text-preset-4-bold text-grey-900">$25.00</p>
        <p className="text-grey-500 text-preset-5 md:hidden">20 Aug 2024</p>
      </div>
    </div>
  );
}
