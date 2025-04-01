import { FormProgress } from "@/components/ui/FormProgress";

type FormOverviewProps = {
  potTheme: {
    bg: string;
    text: string;
  };
  amountToWithdraw?: number;
  amountToAdd?: number;
};

export default function FormOverview({
  potTheme,
  amountToWithdraw,
  amountToAdd,
}: FormOverviewProps) {
  const targetSavings = 2000;
  const amountToaddOrWidthraw =
    amountToAdd || (amountToWithdraw && -amountToWithdraw);
  const totalSaved = 159 + (amountToaddOrWidthraw ?? 0);

  const percentageOfTotalSavedToTarget =
    ((159 + (amountToaddOrWidthraw ?? 0)) / 2000) * 100;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-preset-4 capitalize">total saved</p>

        <p className="text-preset-1 text-grey-900">$159.00</p>
      </div>

      <FormProgress
        value={totalSaved}
        max={targetSavings}
        potTheme={potTheme?.bg}
      />

      <div className="flex items-center justify-between">
        <p className={`text-preset-5-bold ${potTheme?.text}`}>
          {percentageOfTotalSavedToTarget.toFixed(2)}%
        </p>

        <p className="text-grey-500 text-preset-5">
          Target of ${targetSavings}
        </p>
      </div>
    </div>
  );
}
