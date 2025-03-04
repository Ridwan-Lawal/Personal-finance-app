import AuthNavbar from "@/app/_ui/AuthNavbar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex  flex-col  flex-grow gap-[32px]  lg:flex-row lg:items-center ">
      <AuthNavbar />

      <div className="flex-grow  flex items-center justify-center pb-8 lg:pb-0 lg:px-10 lg:py-8">
        {children}
      </div>
    </div>
  );
}
