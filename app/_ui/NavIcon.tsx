"use client";
import { usePathname } from "next/navigation";
import React from "react";

interface NavIconProp {
  Icon: ({ fill }: { fill: string }) => React.JSX.Element;
  text: string;
}

export default function NavIcon({ Icon, text }: NavIconProp) {
  const pathname = usePathname();
  const isLinkActive = pathname.includes(text);

  return (
    <div
      className={`nav-link flex flex-col pt-2 pb-3 gap-1  items-center  max-w-[104px] ${isLinkActive && "border-b-4 border-b-green lg:border-b-0 lg:border-l-4 lg:border-l-green bg-beige-100 rounded-t-lg lg:rounded-t-none lg:rounded-r-lg"} w-full lg:flex-row lg:items-center lg:max-w-full border lg:px-8 md:gap-4  lg:pt-4 py-4`}
    >
      <div className="icon">
        <Icon fill={isLinkActive ? "#277c78" : "#b3b3b3"} />
      </div>
      <p
        className={`text-preset-5-bold lg:text-base  hidden sm:block   capitalize ${isLinkActive ? "text-grey-900" : "text-grey-300"}`}
      >
        {text}
      </p>
    </div>
  );
}
