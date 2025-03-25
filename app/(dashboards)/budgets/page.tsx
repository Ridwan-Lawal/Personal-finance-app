import BudgetAddForm from "@/app/_components/budgets/BudgetAddForm";
import BudgetEditForm from "@/app/_components/budgets/BudgetEditForm";
import CategoryCard from "@/app/_components/budgets/CategoryCard";
import DeleteModal from "@/app/_components/budgets/DeleteModal";
import Header from "@/app/_components/budgets/Header";
import SpendingSummary from "@/app/_components/budgets/SpendingSummary";
import { Metadata } from "@/app/_lib/metadata";

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
        <SpendingSummary />
        <div className="flex flex-grow flex-col gap-6 lg:w-[60%]">
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
        </div>
      </div>

      <BudgetAddForm />
      <BudgetEditForm />
      <DeleteModal />
    </div>
  );
}
