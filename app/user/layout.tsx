import AuthNavbar from "@/app/_ui/AuthNavbar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>
        <AuthNavbar />
      </div>
      <div>{children}</div>
    </div>
  );
}
