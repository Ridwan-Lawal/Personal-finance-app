import BudgetForms from "@/app/_components/budgets/BudgetForms";
import Budgets from "@/app/_components/budgets/Budgets";
import DeleteModal from "@/app/_components/budgets/DeleteModal";
import Header from "@/app/_components/budgets/Header";
import SpendingSummary from "@/app/_components/budgets/SpendingSummary";
import { Metadata } from "@/app/_lib/metadata";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Budgets",
};

export default function Page() {
  return (
    <div className="space-y-8 px-4 py-6 md:px-10 md:py-8">
      <Header />

      {/* category expenses */}

      {/* Spending summary */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <Suspense fallback={<div>Loading...</div>}>
          <SpendingSummary />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <Budgets />
        </Suspense>
      </div>

      <Suspense fallback={<div>Loading forms...</div>}>
        <BudgetForms />
      </Suspense>
      <DeleteModal />
    </div>
  );
}
