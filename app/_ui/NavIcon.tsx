"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface NavIconProp {
  Icon: ({
    fill,
    styles,
  }: {
    fill: string;
    styles: string;
  }) => React.JSX.Element;
  text: string;
  href: string;
  isMinimizeMenu: boolean;
}

export default function NavIcon({
  Icon,
  text,
  href,
  isMinimizeMenu,
}: NavIconProp) {
  const pathname = usePathname();
  const isLinkActive = pathname === href;
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(href)}
      className={`nav-link flex max-w-[104px] flex-col items-center gap-1 pt-2 pb-3 ${isLinkActive && "border-b-green lg:border-l-green bg-beige-100 rounded-t-lg border-b-4 lg:rounded-t-none lg:rounded-r-lg lg:border-b-0 lg:border-l-4"} group w-full cursor-pointer overflow-hidden py-4 lg:max-w-full lg:flex-row lg:items-center lg:gap-4 lg:px-8 lg:pt-4`}
    >
      <div className="icon">
        <Icon
          fill={isLinkActive ? "#277c78" : "#b3b3b3"}
          styles={` transition-colors ${isLinkActive ? "group-hover:fill-[#064d4a]" : "group-hover:fill-grey-100"} `}
        />
      </div>

      <p
        className={`text-preset-5-bold hidden capitalize transition-colors sm:block lg:text-base ${isLinkActive ? "text-grey-900 group-hover:text-green" : "text-grey-300 group-hover:text-grey-100"} ${isMinimizeMenu ? "lg:w-0" : "lg:w-full"}transition-all duration-1000`}
      >
        {text}
      </p>
    </div>
  );
}

// Create a new branch, and start working on the new feature
// Learn about caching and document it
