import "@/app/_styles/globals.css";
import DashboardNavbar from "@/app/_ui/DashboardNavbar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-blue mx-auto flex h-screen w-full max-w-[1440px] flex-col border-2 lg:flex-row-reverse">
      <div className="border-red h-screen flex-grow overflow-auto border-2">
        {children}
      </div>
      <div className="lg:h-screen">
        <DashboardNavbar />
      </div>
    </div>
  );
}

// create layout for the dashboard
