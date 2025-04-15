import Header from "@/app/_components/pots/Header";
import PotForms from "@/app/_components/pots/PotForms";
import Pots from "@/app/_components/pots/Pots";
import { Metadata } from "@/app/_lib/metadata";
import { PotLoadingSkeleton } from "@/app/_skeletons/PotSkeleton";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Pots",
};

export default function Page() {
  return (
    <div className="space-y-8 px-4 py-5 md:px-8 md:py-10">
      <Header />

      <Suspense fallback={<PotLoadingSkeleton />}>
        <Pots />
      </Suspense>

      <PotForms />
    </div>
  );
}

// continue with the pots suspense
