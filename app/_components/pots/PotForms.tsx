import AddMoneyForm from "@/app/_components/pots/AddMoneyForm";
import AddNewPotForm from "@/app/_components/pots/AddNewPotForm";
import EditPotform from "@/app/_components/pots/EditPot";
import PotDeleteModal from "@/app/_components/pots/PotDeleteModal";
import { getPots } from "@/app/_lib/data-service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function PotForms() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["pots"],
    queryFn: getPots,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AddNewPotForm />
      <EditPotform />
      <PotDeleteModal />
      <AddMoneyForm />
      {/* <WithdrawMoneyForm /> */}
    </HydrationBoundary>
  );
}
