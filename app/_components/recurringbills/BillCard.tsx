import avatar from "@/public/avatars/aqua-flow-utilities.jpg";

import Check from "@/public/icon-bill-paid.svg";
import Image from "next/image";

export default function BillCard() {
  return (
    <div className="items-center space-y-2 md:flex md:items-center">
      {/* avatar and name */}
      <div className="flex items-center gap-4 md:w-[55%]">
        <div className="relative size-8 overflow-hidden rounded-full">
          <Image
            src={avatar}
            alt="avatar"
            priority={true}
            fill
            className="object-cover"
          />
        </div>

        <p className="text-preset-4-bold text-grey-900 capitalize">
          elevate education
        </p>
      </div>

      {/* monthly and price */}
      <div className="flex items-center justify-between md:w-[45%]">
        <div className="flex items-center gap-2">
          <p className="text-preset-5 text-green capitalize">monthly-3rd</p>
          <Image src={Check} alt="check" priority={true} />
        </div>

        <p className="text-preset-4-bold text-grey-900">$250.00</p>
      </div>
    </div>
  );
}
