import { PotProgress } from "@/components/ui/PotProgress";

export default function Overview() {
  const totalSaved = 159;
  const targetSavings = 2000;

  const percentageOfTotalSavedToTarget = (159 / 2000) * 100;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-preset-4 capitalize">total saved</p>

        <p className="text-preset-1 text-grey-900">$159.00</p>
      </div>

      <PotProgress value={totalSaved} max={targetSavings} potTheme="bg-green" />

      <div className="flex items-center justify-between">
        <p className="text-preset-5-bold text-grey-500">
          {percentageOfTotalSavedToTarget}%
        </p>

        <p className="text-grey-500 text-preset-5">
          Target of ${targetSavings}
        </p>
      </div>
    </div>
  );
}
