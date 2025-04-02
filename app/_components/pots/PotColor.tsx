"use client";

import { useDropdown } from "@/app/_hooks/useDropdown";
import { COLORS } from "@/app/_lib/constant";
import { getBudgets } from "@/app/_lib/data-service-client";
import chevronDown from "@/public/icon-caret-down.svg";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

export default function PotColor({
  inputDisable,
  defaultColorToEdit,
}: {
  inputDisable?: boolean;
  defaultColorToEdit?: string | null;
}) {
  const { data: pots } = useSuspenseQuery({
    queryKey: ["pots"],
    queryFn: () => getBudgets(),
  });

  // The colors that have been used to create a budget
  const colorTagsUsed = pots?.map((budget) => budget?.colorTag);

  // default color when you click on edit form
  const colorToEdit = COLORS?.filter(
    (color) => color?.color?.toLowerCase() === defaultColorToEdit,
  )?.at(0);

  // Form default color
  const defaultColor =
    colorToEdit ||
    COLORS.filter((color) => !colorTagsUsed?.includes(color?.color))?.at(0);

  console.log(defaultColor, colorToEdit, "okaaay");

  const [budgetColor, setBudgetColor] = useState(defaultColor);
  const { isDropdownOpen, onOpenDropdown } = useDropdown(".color-tag");

  const onUpdateBudgetColor = (color: { color: string; style: string }) =>
    setBudgetColor(color);

  return (
    <fieldset className="field color-tag relative">
      <label htmlFor="colorTag">Theme</label>

      <div
        className="field-container cursor-pointer border"
        onClick={onOpenDropdown}
        aria-disabled={inputDisable}
      >
        <p className={`size-4 rounded-full ${budgetColor?.style}`} />
        <input
          type="text"
          name="potTheme"
          id="potTheme"
          value={budgetColor?.color}
          disabled={inputDisable}
          autoComplete="potTheme"
          aria-label="pot theme"
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
