import DashboardNavbar from "@/app/_ui/DashboardNavbar";
import React from "react";
import "@/app/_styles/globals.css";

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
