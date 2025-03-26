"use client";

import { useDropdown } from "@/app/_hooks/useDropdown";
import { getBudgets } from "@/app/_lib/data-service-client";
import chevronDown from "@/public/icon-caret-down.svg";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

const COLORS = [
  { color: "green", style: "bg-green" },
  { color: "yellow", style: "bg-yellow" },
  { color: "cyan", style: "bg-cyan" },
  { color: "red", style: "bg-red" },
  { color: "purple", style: "bg-purple" },
  { color: "turquoise", style: "bg-turquoise" },
  { color: "brown", style: "bg-brown" },
  { color: "magenta", style: "bg-magenta" },
  { color: "blue", style: "bg-blue" },
  { color: "gold", style: "bg-gold" },
  { color: "orange", style: "bg-orange" },
  { color: "army green", style: "bg-army-green" },
  { color: "navy grey", style: "bg-navy-grey" },
];

export default function BudgetColor({
  inputDisable,
}: {
  inputDisable: boolean;
}) {
  const { data: budgets } = useSuspenseQuery({
    queryKey: ["budgets"],
    queryFn: () => getBudgets(),
  });

  const colorTagsUsed = budgets?.map((budget) => budget?.colorTag);

  const defaultColor = COLORS.filter(
    (color) => !colorTagsUsed?.includes(color?.color),
  )?.at(0);

  const [budgetColor, setBudgetColor] = useState(defaultColor);
  const { isDropdownOpen, onOpenDropdown } = useDropdown(".color-tag");

  const onUpdateBudgetColor = (color: { color: string; style: string }) =>
    setBudgetColor(color);

  return (
    <fieldset className="field color-tag relative">
      <label htmlFor="colorTag">Color Tag</label>

      <div
        className="field-container cursor-pointer border"
        onClick={onOpenDropdown}
        aria-disabled={inputDisable}
      >
        <p className={`size-4 rounded-full ${budgetColor?.style}`} />
        <input
          type="text"
          name="colorTag"
          id="colorTag"
          value={budgetColor?.color}
          disabled={inputDisable}
          autoComplete="colorTag"
          aria-label="color tag"
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
        <div className="border-red absolute top-20 z-30 w-full overflow-hidden rounded-lg border bg-white">
          <ul className="scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-gray-300 scrollbar-track-white scroll h-[150px] w-full space-y-3 overflow-auto rounded-lg border bg-white px-5 py-3 shadow-md lg:md:h-[130px]">
            {COLORS?.map((color) => (
              <li key={color?.color}>
                <button
                  type="button"
                  className="text-preset-4 flex w-full cursor-pointer items-center justify-between gap-2"
                  onClick={() => onUpdateBudgetColor(color)}
                >
                  <span className="flex items-center gap-3">
                    <p
                      className={`size-4 rounded-full ${color?.style} ${colorTagsUsed?.includes(color?.color) ? "opacity-25" : "opacity-100"}`}
                    />
                    <span
                      className={`text-preset-4 capitalize ${budgetColor?.color === color?.color && "font-bold"} ${colorTagsUsed?.includes(color?.color) ? "text-grey-300" : "text-grey-900 hover:text-grey-500"} `}
                    >
                      {color?.color}
                    </span>
                  </span>

                  {colorTagsUsed?.includes(color?.color) && (
                    <span className="text-preset-5 text-grey-500">
                      Already used
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </fieldset>
  );
}
