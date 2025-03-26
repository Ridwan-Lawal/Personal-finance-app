import CategoryCard from "@/app/_components/budgets/CategoryCard";
import { getBudgets } from "@/app/_lib/data-service";

export default async function Budgets() {
  const budgets = await getBudgets();

  return (
    <div className="flex flex-grow flex-col gap-6 lg:w-[60%]">
      {budgets?.map((budget) => (
        <CategoryCard key={budget?.id} budget={budget} />
      ))}
    </div>
  );
}
