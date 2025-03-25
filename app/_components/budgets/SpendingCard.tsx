import Image from "next/image";

export default function SpendingCard() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-grow items-center gap-4">
        {/* avatar */}
        <div className="relative hidden size-8 overflow-hidden rounded-full md:block">
          <Image
            src="/avatars/aqua-flow-utilities.jpg"
            alt="avatar"
            fill
            className="object-cover"
          />
        </div>

        {/* name on transaction */}
        <p className="text-preset-5-bold text-grey-900 capitalize">
          papa software
        </p>
      </div>

      {/* transaction and data */}
      <div className="space-y-1 text-right">
        <p className="text-preset-5-bold text-grey-900">-$10.00</p>
        <p className="text-preset-5 text-grey-500">16 Aug 2024</p>
      </div>
    </div>
  );
}
