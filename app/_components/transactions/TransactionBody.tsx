"use client";

import SelectBar from "@/app/_components/transactions/SelectBar";
import TransactionHeader from "@/app/_components/transactions/TransactionHeader";
import TransactionsCard from "@/app/_components/transactions/TransactionsCard";
import { filter, sort } from "@/app/_lib/constant";
import chevronLeftIcon from "@/public/icon-caret-left.svg";
import searchIcon from "@/public/icon-search.svg";
import Form from "next/form";
import Image from "next/image";
import { useState } from "react";

export default function TransactionBody() {
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
    <div className="space-y-6 rounded-[12px] bg-white px-5 py-6 md:px-8 md:py-8">
      {/* header */}
      <header className="flex items-center justify-between gap-6">
        <Form
          action=""
          autoComplete="on"
          className="border-beige-500 flex items-center gap-4 rounded-[8px] border px-5 py-3 lg:w-[320px]"
        >
          <input
            type="text"
            name="search-transaction"
            id="search-transaction"
            defaultValue=""
            autoComplete="search-transaction"
            placeholder="Search transaction"
            aria-live="polite"
            aria-label="search transaction"
            className="basic-input text-preset-4 flex-grow focus:outline-none"
          />
          <Image src={searchIcon} alt="search icon" />
        </Form>

        {/* filter and sort bar */}
        <div className="flex items-center gap-6">
          {/* sort bar */}
          <SelectBar
            select={sort}
            isDropdownOpen={isSortDropdownOpen}
            onOpenDropdown={onOpenSortDropdown}
            onBlurDropdown={() => setIsSortDropdownOpen(false)}
          />

          {/* filter bar */}
          <SelectBar
            select={filter}
            isDropdownOpen={isFilterDropdownOpen}
            onOpenDropdown={onOpenFilterDropdown}
            onBlurDropdown={() => setIsFilterDropdownOpen(false)}
          />
        </div>
      </header>

      {/* ======== main ========== */}
      <main>
        {/* Transactions header */}
        <TransactionHeader />

        {/* transactions cards
         */}

        <div className="p space-y-4">
          <TransactionsCard />
          <TransactionsCard />
          <TransactionsCard />
        </div>

        {/* footer pagination */}

        <div className="mt-11 flex items-center justify-between">
          <button className="btn text-preset-4 btn-pagination">
            <Image src={chevronLeftIcon} alt="arrow" priority={true} />

            <span>Prev</span>
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }, (_, i) => i + 1).map((page) => (
              <button
                className="btn text-preset-4 btn-pagination size-10 justify-center"
                key={page}
              >
                {page}
              </button>
            ))}
          </div>

          <button className="btn text-preset-4 btn-pagination">
            <Image src={chevronLeftIcon} alt="arrow" priority={true} />

            <span>Next</span>
          </button>
        </div>
      </main>
    </div>
  );
}
