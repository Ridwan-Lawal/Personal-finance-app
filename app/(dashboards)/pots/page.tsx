import AddNewPotForm from "@/app/_components/pots/AddNewPotForm";
import EditPotform from "@/app/_components/pots/EditPot";
import Header from "@/app/_components/pots/Header";
import PotCard from "@/app/_components/pots/PotCard";
import PotDeleteModal from "@/app/_components/pots/PotDeleteModal";
import WithdrawMoneyForm from "@/app/_components/pots/WithdrawMoneyForm";
import { Metadata } from "@/app/_lib/metadata";

export const metadata: Metadata = {
  title: "Pots",
};

export default function Page() {
  return (
    <div className="space-y-8 px-4 py-5 md:px-8 md:py-10">
      <Header />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <PotCard />
        <PotCard />
        <PotCard />
        <PotCard />
      </div>

      <AddNewPotForm />
      <EditPotform />
      <PotDeleteModal />
      {/* <AddMoneyForm /> */}
      <WithdrawMoneyForm />
    </div>
  );
}
