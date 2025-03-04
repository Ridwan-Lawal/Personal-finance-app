import { Metadata } from "@/app/_lib/metadata";
import React from "react";
import SignupForm from "@components/authentication/SignupForm";

export const metadata: Metadata = {
  title: "Sign up",
};

export default function Page() {
  return (
    <div className="w-full">
      <SignupForm />
    </div>
  );
}
