import { getColorStyles } from "@/app/_lib/helper";
import { PotProgress } from "@/components/ui/PotProgress";

type OverviewProps = {
  potCurrentBalance: number | null;
  potTarget: number | null;
  potTheme: string | null;
};

export default function Overview({
  potCurrentBalance,
  potTarget,
  potTheme,
}: OverviewProps) {
  const percentageOfTotalSavedToTarget =
    ((potCurrentBalance ?? 0) / (potTarget ?? 0)) * 100;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-preset-4 capitalize">total saved</p>

        <p className="text-preset-1 text-grey-900">${potCurrentBalance}</p>
      </div>

      <PotProgress
        value={potCurrentBalance}
        max={potTarget as number}
        potTheme={getColorStyles(potTheme)}
      />

      <div className="flex items-center justify-between">
        <p className="text-preset-5-bold text-grey-500">
          {percentageOfTotalSavedToTarget}%
        </p>

        <p className="text-grey-500 text-preset-5">Target of ${potTarget}</p>
      </div>
    </div>
  );
}
