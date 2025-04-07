"use client";

import { sort } from "@/app/_lib/constant";
import chevronDown from "@/public/icon-caret-down.svg";
import sortIcon from "@/public/icon-sort-mobile.svg";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function Sortbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const onDropdown = () => setIsDropdownOpen((cur) => !cur);

  return (
    <div className="relative flex flex-col">
      <div className="self-end">
        <button className="cursor-pointer md:hidden" onClick={onDropdown}>
          <Image src={sortIcon} alt="sort" priority={true} />
        </button>

        <div className="hidden items-center gap-2 md:flex" onClick={onDropdown}>
          <p className="text-preset-4 text-grey-500">Sort by</p>
          <div className="border-grey-900 flex cursor-pointer items-center gap-4 rounded-lg border px-5 py-3">
            <p className="text-preset-4 text-grey-900">latest</p>

            <button className="cursor-pointer">
              <Image
                src={chevronDown}
                alt="chevron"
                priority={true}
                className={`${isDropdownOpen ? "rotate-180" : "rotate-0"} transition-transform`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* dropdown */}
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.ul
            className="absolute top-7 right-0 mt-1 w-[114px] space-y-3 rounded-lg bg-white px-5 py-3 shadow-lg md:top-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {sort?.options?.map((sortType, index, arr) => (
              <li
                className={`text-preset-4 text-grey-900 flex flex-col gap-3 capitalize`}
                key={sortType}
              >
                <span> {sortType}</span>

                {index !== arr.length - 1 && (
                  <div className="border-grey-100 border-b" />
                )}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

// sort bar dropdown functionality
