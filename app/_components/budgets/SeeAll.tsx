"use client";

import { Chevron } from "@/app/_ui/NavIcons";
import { useRouter, useSearchParams } from "next/navigation";

type SeeAll = {
  budgetCategory: string | null;
};

export default function SeeAll({ budgetCategory }: SeeAll) {
  const searchParams = useSearchParams();
  const router = useRouter();

  function onSeeAll() {
    const params = new URLSearchParams(searchParams.toString());

    if (budgetCategory) {
      params.set("category", budgetCategory?.toLowerCase());

      router.push(`/transactions?${params.toString()}`);
    }
  }

  return (
    <button
      className="flex cursor-pointer items-center gap-3"
      onClick={onSeeAll}
    >
      <span className="text-preset-4 text-grey-500 capitalize">see all</span>
      <Chevron className="h-[5px] w-2" />
    </button>
  );
}
