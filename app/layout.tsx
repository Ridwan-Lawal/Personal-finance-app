import { Metadata } from "@/app/_lib/metadata";
import Providers from "@/app/_lib/react-query/QueryClientProvider";
import StoreProvider from "@/app/_lib/redux/StoreProvider";
import { publicSans } from "@/app/_styles/font";
import "@/app/_styles/globals.css";
import React from "react";
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
      <StoreProvider>
        <body
          className={`${publicSans?.className} flex border-2 border-red-900 antialiased`}
        >
          <Providers>
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
          </Providers>
        </body>
      </StoreProvider>
    </html>
  );
}

// activating streaming globally

// understanding the project
