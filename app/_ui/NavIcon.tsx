"use client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
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
      className={`nav-link flex flex-col pt-2 pb-3 gap-1  items-center  max-w-[104px] ${isLinkActive && "border-b-4 border-b-green lg:border-b-0 lg:border-l-4 lg:border-l-green bg-beige-100 rounded-t-lg lg:rounded-t-none lg:rounded-r-lg"} w-full lg:flex-row lg:items-center lg:max-w-full border lg:px-8 lg:gap-4  lg:pt-4 py-4 cursor-pointer group overflow-hidden`}
    >
      <div className="icon">
        <Icon
          fill={isLinkActive ? "#277c78" : "#b3b3b3"}
          styles="group-hover:fill-grey-100 transition-colors"
        />
      </div>

      <p
        className={`text-preset-5-bold lg:text-base hidden sm:block  group-hover:text-grey-100 transition-colors capitalize ${isLinkActive ? "text-grey-900" : "text-grey-300"} ${isMinimizeMenu ? "lg:w-0" : "lg:w-full"}transition-all duration-1000 border`}
      >
        {text}
      </p>
    </div>
  );
}
