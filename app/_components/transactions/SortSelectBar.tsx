"use client";

import { useSelectOptions } from "@/app/_hooks/useSelectOptions";
import chevronDownIcon from "@/public/icon-caret-down.svg";
import clsx from "clsx";
import Image, { StaticImageData } from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface selectBarProps<T extends StaticImageData> {
  select: {
    icon: T;
    label: string;
    options: string[];
  };
  isDropdownOpen: boolean;
  onOpenDropdown: () => void;
  onBlurDropdown: () => void;
}

export default function SortSelectBar<T extends StaticImageData>({
  select,
  isDropdownOpen,
  onOpenDropdown,
  onBlurDropdown,
}: selectBarProps<T>) {
  const { icon, label, options } = select ?? {};

  const searchParams = useSearchParams();
  const sortByOption = searchParams.get("sortby") || "latest";

  //Adding options to the url
  const { onSelectOption, optimisticOption } = useSelectOptions(
    sortByOption,
    searchParams,
    "sortby",
  );

  // Effect for handling clicks outside the dropdown
  useEffect(() => {
    function handleOnUnfocusOptions(e: MouseEvent) {
      const el = e.target as HTMLElement;
      if (e.target) {
        if (!el.closest(".dropdown-block")) {
          onBlurDropdown();
        }
      }
    }

    document.addEventListener("click", handleOnUnfocusOptions);

    return () => document.removeEventListener("click", handleOnUnfocusOptions);
  }, [onBlurDropdown]);

  return (
    <div className="dropdown-block flex w-fit flex-col gap-2 border">
      {/* icon  */}
      <Image
        src={icon}
        alt="sort"
        quality={100}
        priority={true}
        className="cursor-pointer transition-all md:hidden"
        onClick={onOpenDropdown}
      />

      {/* select bar */}
      <div className="select-bar">
        <p className="text-preset-4 text-grey-500">{label}</p>

        <div className="cursor-pointer" onClick={onOpenDropdown}>
          <p className="text-preset-4 text-grey-900 capitalize">
            {optimisticOption?.optionSelected}
          </p>
          <Image
            src={chevronDownIcon}
            alt="chevron-down"
            quality={100}
            priority={true}
            className={clsx("transition-transform", {
              "rotate-180": isDropdownOpen,
              "rotate-0": !isDropdownOpen,
            })}
          />
        </div>
      </div>

      {/* drop down list */}
      {isDropdownOpen && (
        <div className="relative">
          <ul className="dropdown right-0 w-fit bg-white md:w-full">
            {options.map((option) => (
              // font-bold for active selection
              <li
                key={option}
                className={clsx(
                  {
                    "font-bold": option === optimisticOption?.optionSelected,
                  },
                  "text-preset-4 text-grey-900 cursor-pointer capitalize transition-all hover:font-bold",
                )}
                onClick={() => onSelectOption(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
