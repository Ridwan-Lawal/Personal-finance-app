"use client";
import React from "react";

import {
  BudgetsIcon,
  OverviewIcon,
  PotsIcon,
  RecurringBillsIcon,
  TransactionIcon,
} from "@/app/_ui/NavIcons";

import NavIcon from "@/app/_ui/NavIcon";

const navLinks = [
  { navIcon: OverviewIcon, navText: "overview" },
  { navIcon: TransactionIcon, navText: "transactions" },
  { navIcon: BudgetsIcon, navText: "budgets" },
  { navIcon: PotsIcon, navText: "pots" },
  { navIcon: RecurringBillsIcon, navText: "recurring bills" },
];

export default function DashboardNavbar() {
  return (
    <nav className="border border-black bg-grey-900 h-full lg:w-full lg:max-w-[300px]">
      {/* logo on desktop */}
      {/* each link */}
      <div className="flex flex-row justify-between items-center lg:flex-col px-4 md:px-10 pt-2 lg:px-0 lg:items-start border lg:pr-6 lg:gap-1">
        {navLinks.map((link) => (
          <NavIcon
            key={link?.navText}
            Icon={link?.navIcon}
            text={link?.navText}
          />
        ))}
      </div>

      {/* mininmize menu */}
    </nav>
  );
}

// continue to create the components
