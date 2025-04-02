import Header from "@/app/_components/pots/Header";
import PotForms from "@/app/_components/pots/PotForms";
import Pots from "@/app/_components/pots/Pots";
import { Metadata } from "@/app/_lib/metadata";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Pots",
};

export default function Page() {
  return (
    <div className="space-y-8 px-4 py-5 md:px-8 md:py-10">
      <Header />

      <Suspense fallback={<div>Loading...</div>}>
        <Pots />
      </Suspense>

      <PotForms />
    </div>
  );
}
