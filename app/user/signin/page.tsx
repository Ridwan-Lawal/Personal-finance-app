import SigninForm from "@/app/_components/authentication/SigninForm";
import { Metadata } from "@/app/_lib/metadata";
import React from "react";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function Page() {
  return (
    <div className="w-full">
      <SigninForm />
    </div>
  );
}
