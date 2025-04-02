import Menu from "@/app/_components/pots/Menu";
import Overview from "@/app/_components/pots/Overview";
import PotCardButtons from "@/app/_components/pots/PotCardButtons";
import { getColorStyles } from "@/app/_lib/helper";
import { Pot } from "@/app/_lib/supabase/server";

export default function PotCard({ pot }: { pot: Pot }) {
  const { id, potName, potTarget, potTheme, potCurrentBalance } = pot ?? {};

  return (
    <div className="relative space-y-8 rounded-xl bg-white px-4 py-5 md:px-6">
      {/* Card header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`${getColorStyles(potTheme)} size-4 rounded-full`} />

          <h2 className="text-preset-2 text-grey-200 capitalize">{potName}</h2>
        </div>

        <Menu potId={id} potName={potName} />

        {/* <Menu pot={{ potName, id, potTarget, potTheme }} /> */}
      </div>

      <Overview
        potCurrentBalance={potCurrentBalance}
        potTarget={potTarget}
        potTheme={potTheme}
      />

      {/* buttons */}
      <PotCardButtons potId={id} potName={potName} />
    </div>
  );
}
