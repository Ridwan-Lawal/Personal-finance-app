import DashboardNavbar from "@/app/_ui/DashboardNavbar";
import React from "react";
import "@styles/globals.css";
import { Metadata } from "@/app/_lib/metadata";

export const metadata: Metadata = {
  title: {
    template: "%s - Personal Finance App",
    default: "Overview - Personal Finance App",
  },
  description:
    "An app where you can keep track of your personal finance at-a-glance, manage your budgets, view  progress of your pots and recurring bills and status for a specific period of time.  ",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>
        <DashboardNavbar />
      </div>
      <div>{children}</div>
    </div>
  );
}

// create layout for the dashboard
