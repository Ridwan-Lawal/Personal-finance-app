import { publicSans } from "@/app/_styles/font";
import React from "react";
import "@/app/_styles/globals.css";
import { Metadata } from "@/app/_lib/metadata";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    template: "%s - Personal Finance App",
    default: "Overview - Personal Finance App",
  },
  description:
    "A Personal finance app that puts you in control of your spending, Track transaction, set budgets and add to savings pots easily.  ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${publicSans?.className} antialiased border-2 border-red-900 flex`}
      >
        {children}

        <Toaster
          toastOptions={{
            success: {
              iconTheme: {
                primary: "#277c78",
                secondary: "white",
              },
            },
            error: {
              iconTheme: {
                primary: "#c94736",
                secondary: "white",
              },
            },
          }}
        />
      </body>
    </html>
  );
}

// activating streaming globally

// understanding the project
