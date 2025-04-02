import PotCard from "@/app/_components/pots/PotCard";
import { getPots } from "@/app/_lib/data-service";

export default async function Pots() {
  const pots = await getPots();

  if (!pots.length) {
    return (
      <h2 className="text-grey-900 flex h-[40vh] items-center justify-center text-xl font-semibold">
        Add a new pot to get started
      </h2>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {pots?.map((pot) => <PotCard key={pot?.id} pot={pot} />)}
    </div>
  );
}

// Add money and withdraw money functionality
