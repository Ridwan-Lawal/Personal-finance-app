"use client";

import { useDropdown } from "@/app/_hooks/useDropdown";
import { getBudgets } from "@/app/_lib/data-service-client";
import chevronDown from "@/public/icon-caret-down.svg";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

const CATEGORIES = [
  "Entertainment",
  "Bills",
  "Groceries",
  "Dining Out",
  "Transportation",
  "Personal Care",
  "Lifestyle",
  "Education",
];

export default function BudgetCategory({
  inputDisable,
}: {
  inputDisable: boolean;
}) {
  const { data: budgets } = useSuspenseQuery({
    queryKey: ["budgets"],
    queryFn: () => getBudgets(),
  });

  const categoriesCreated = budgets?.map((budget) => budget?.category);

  const defaultCategory = CATEGORIES?.filter(
    (categories) => !categoriesCreated?.includes(categories),
  )?.at(0);

  const [budgetCategory, setBudgetCategory] = useState(defaultCategory);

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
          disabled={inputDisable}
          aria-disabled={inputDisable}
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
            <li key={category}>
              <button
                type="button"
                className="disabled:text-grey-300 flex w-full cursor-pointer items-center justify-between gap-1"
                onClick={() => onUpdateBudgetCategory(category)}
                disabled={categoriesCreated?.includes(category)}
              >
                <span
                  className={`text-preset-4 capitalize ${budgetCategory === category && "font-bold"} ${categoriesCreated?.includes(category) ? "text-grey-300" : "text-grey-900 hover:text-grey-500"}`}
                >
                  {category}
                </span>
                {categoriesCreated?.includes(category) && (
                  <span className="text-preset-5 text-grey-500">
                    Already created
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </fieldset>
  );
}
