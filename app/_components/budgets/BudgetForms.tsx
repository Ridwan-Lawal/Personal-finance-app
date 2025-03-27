import BudgetAddForm from "@/app/_components/budgets/BudgetAddForm";
import BudgetEditForm from "@/app/_components/budgets/BudgetEditForm";
import { getBudgets } from "@/app/_lib/data-service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function BudgetForms() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["budgets"],
    queryFn: getBudgets,
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BudgetAddForm />
        <BudgetEditForm />
      </HydrationBoundary>
    </>
  );
}
