import DashboardNavbar from "@/app/_ui/DashboardNavbar";
import React from "react";
import "@/app/_styles/globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen w-full lg:flex-row-reverse max-w-[1440px] mx-auto">
      <div className="flex-grow border-2 border-red ">{children}</div>
      <div className="lg:min-h-screen ">
        <DashboardNavbar />
      </div>
    </div>
  );
}

// create layout for the dashboard
