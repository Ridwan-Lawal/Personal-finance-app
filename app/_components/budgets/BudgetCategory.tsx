"use client";

import { useDropdown } from "@/app/_hooks/useDropdown";
import chevronDown from "@/public/icon-caret-down.svg";
import Image from "next/image";
import { useState } from "react";

const CATEGORIES = [
  "entertainment",
  "bills",
  "groceries",
  "dining out",
  "transportation",
  "personal care",
  "lifestyle",
  "education",
];

export default function BudgetCategory() {
  const [budgetCategory, setBudgetCategory] = useState("entertainment");

  const { isDropdownOpen, onOpenDropdown } = useDropdown(".budget-category");

  const onUpdateBudgetCategory = (category: string) =>
    setBudgetCategory(category);

  return (
    <fieldset className="field budget-category relative">
      <label htmlFor="category">Budget Category</label>

      <div
        className="field-container cursor-pointer border"
        onClick={onOpenDropdown}
      >
        <input
          type="text"
          name="category"
          id="category"
          value={budgetCategory}
          autoComplete="category"
          aria-label="budget category"
          aria-live="polite"
          className="basic-input cursor-pointer capitalize"
          onChange={() => ""}
        />

        <Image
          src={chevronDown}
          alt="chevron"
          className={`${isDropdownOpen ? "rotate-180" : "rotate-0"} transition-transform`}
        />
      </div>
      {isDropdownOpen && (
        <ul className="scrollbar-thin scrollbar-track-white scrollbar-thumb-gray-300 absolute top-20 z-40 h-[250px] w-full space-y-3 overflow-auto rounded-lg border bg-white px-5 py-3 shadow-md shadow-gray-200">
          {CATEGORIES?.map((category) => (
            <li
              key={category}
              className="flex cursor-pointer flex-col gap-1"
              onClick={() => onUpdateBudgetCategory(category)}
            >
              <span className="text-preset-4 text-grey-900 hover:text-grey-500 capitalize">
                {category}
              </span>
            </li>
          ))}
        </ul>
      )}
    </fieldset>
  );
}
