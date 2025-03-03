import { publicSans } from "@/app/_styles/font";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${publicSans?.className} antialiased`}>{children}</body>
    </html>
  );
}

// activating streaming globally

// understanding the project
