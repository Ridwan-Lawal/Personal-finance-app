"use client";

import CategorySelectBar from "@/app/_components/transactions/CategorySelectBar";
import SortSelectBar from "@/app/_components/transactions/SortSelectBar";
import { filter, sort } from "@/app/_lib/constant";
import { useState } from "react";

export default function TransactionFilterSort() {
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  const onOpenSortDropdown = () => {
    setIsSortDropdownOpen((cur) => !cur);
    setIsFilterDropdownOpen(false);
  };

  const onOpenFilterDropdown = () => {
    setIsFilterDropdownOpen((cur) => !cur);
    setIsSortDropdownOpen(false);
  };
  return (
    <div className="flex items-center gap-6">
      {/* sort bar */}
      <SortSelectBar
        select={sort}
        isDropdownOpen={isSortDropdownOpen}
        onOpenDropdown={onOpenSortDropdown}
        onBlurDropdown={() => setIsSortDropdownOpen(false)}
      />

      {/* filter bar */}
      <CategorySelectBar
        select={filter}
        isDropdownOpen={isFilterDropdownOpen}
        onOpenDropdown={onOpenFilterDropdown}
        onBlurDropdown={() => setIsFilterDropdownOpen(false)}
      />
    </div>
  );
}
