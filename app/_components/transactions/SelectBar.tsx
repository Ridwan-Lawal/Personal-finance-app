"use client";

import chevronDownIcon from "@/public/icon-caret-down.svg";
import clsx from "clsx";
import Image, { StaticImageData } from "next/image";
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

export default function SelectBar<T extends StaticImageData>({
  select,
  isDropdownOpen,
  onOpenDropdown,
  onBlurDropdown,
}: selectBarProps<T>) {
  const { icon, label, options } = select ?? {};

  useEffect(() => {
    function handleOnUnfocusOptions(e: Event) {
      if (e.target) {
        if (!e.target.closest(".dropdown-block")) {
          console.log("yes");
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
          <p className="text-preset-4 text-grey-900">Latest</p>
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
            {options.map((sortType) => (
              // font-bold for active selection
              <li
                key={sortType}
                className="text-preset-4 text-grey-900 cursor-pointer capitalize transition-all hover:font-bold"
              >
                {sortType}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
