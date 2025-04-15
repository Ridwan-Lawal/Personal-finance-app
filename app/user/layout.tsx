import AuthNavbar from "@/app/_ui/AuthNavbar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-grow flex-col gap-[32px] lg:flex-row lg:items-center">
      <AuthNavbar />

      <div className="flex flex-1 items-center justify-center px-6 pb-8 lg:px-10 lg:py-8 lg:pb-0">
        {children}
      </div>
    </div>
  );
}
