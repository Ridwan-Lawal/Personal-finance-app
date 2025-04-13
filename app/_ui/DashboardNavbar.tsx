"use client";

import {
  BudgetsIcon,
  MinimizeIcon,
  OverviewIcon,
  PotsIcon,
  RecurringBillsIcon,
  TransactionIcon,
} from "@/app/_ui/NavIcons";

import NavIcon from "@/app/_ui/NavIcon";
import logo from "@/public/logo-large.svg";
import Image from "next/image";

import SignoutButton from "@/app/_components/authentication/SignoutButton";
import { useMinimizeMenu } from "@/app/_hooks/useMinimizeMenu";
import logoSmall from "@/public/logo-small.svg";

const navLinks = [
  { navIcon: OverviewIcon, navText: "overview", route: "/" },
  { navIcon: TransactionIcon, navText: "transactions", route: "/transactions" },
  { navIcon: BudgetsIcon, navText: "budgets", route: "/budgets" },
  { navIcon: PotsIcon, navText: "pots", route: "/pots" },
  {
    navIcon: RecurringBillsIcon,
    navText: "recurring bills",
    route: "/recurringbills",
  },
];

export default function DashboardNavbar() {
  const { isMinimizeMenu, onMinimiseMenu } = useMinimizeMenu();

  return (
    <nav
      className={`dashboard-nav ${isMinimizeMenu ? "lg:max-w-[88px]" : "lg:max-w-[300px]"} overflow-hidden transition-all duration-300`}
    >
      {/* logo on desktop */}
      <div className="hidden lg:block lg:px-8 lg:py-10">
        <Image
          src={isMinimizeMenu ? logoSmall : logo}
          alt="logo"
          quality={100}
          priority={true}
        />
      </div>

      {/* each link */}
      <div className="nav-links">
        {navLinks.map((link) => (
          <NavIcon
            key={link?.navText}
            Icon={link?.navIcon}
            text={link?.navText}
            href={link?.route}
            isMinimizeMenu={isMinimizeMenu}
          />
        ))}
        <SignoutButton isMinimizeMenu={isMinimizeMenu} />
      </div>

      {/* mininmize menu */}
      <div className="lg:px-8 lg:py-4">
        <button
          onClick={onMinimiseMenu}
          className="group hidden cursor-pointer items-center gap-4 border lg:flex"
        >
          <div className={`${isMinimizeMenu ? "rotate-180" : "rotate-0"}`}>
            <MinimizeIcon styles="group-hover:fill-grey-100 transition-colors" />
          </div>
          {!isMinimizeMenu && (
            <span className="text-preset-3 text-grey-300 group-hover:text-grey-100 capitalize transition-colors">
              minimize menu
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}

// continue to create the components
