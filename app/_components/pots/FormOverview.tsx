"use client";

import { getPots } from "@/app/_lib/data-service-client";
import { FormProgress } from "@/components/ui/FormProgress";
import { useQuery } from "@tanstack/react-query";

type FormOverviewProps = {
  potTheme: {
    bg: string;
    text: string;
  };
  amountToWithdraw?: number;
  amountToAdd?: number;
  potToAddorWithdrawMoney: {
    potId: string;
    potName: string;
  };
};

export default function FormOverview({
  potTheme,
  amountToWithdraw,
  amountToAdd,
  potToAddorWithdrawMoney,
}: FormOverviewProps) {
  const { data: pots } = useQuery({
    queryKey: ["pots"],
    queryFn: () => getPots(),
  });

  console.log(amountToWithdraw, "jfaljfaljlajfkaj");

  const potToAddorWithdrawMoneyData = pots
    ?.filter((pot) => pot?.id === potToAddorWithdrawMoney?.potId)
    ?.at(0);

  const amountToaddOrWidthraw =
    amountToAdd || (amountToWithdraw && -amountToWithdraw);

  const totalSaved =
    (potToAddorWithdrawMoneyData?.potCurrentBalance ?? 0) +
    (amountToaddOrWidthraw ?? 0);

  const percentageOfTotalSavedToTarget =
    (((potToAddorWithdrawMoneyData?.potCurrentBalance ?? 0) +
      (amountToaddOrWidthraw ?? 0)) /
      (potToAddorWithdrawMoneyData?.potTarget ?? 0)) *
    100;

  const totalSavedPlusAmountToAddOrWithdraw =
    (potToAddorWithdrawMoneyData?.potCurrentBalance ?? 0) +
    (amountToaddOrWidthraw ?? 0);

  console.log(percentageOfTotalSavedToTarget, totalSaved);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-preset-4 capitalize">total saved</p>

        <p className="text-preset-1 text-grey-900">
          $
          {totalSavedPlusAmountToAddOrWithdraw < 0
            ? 0
            : totalSavedPlusAmountToAddOrWithdraw}
        </p>
      </div>

      <FormProgress
        value={totalSaved}
        max={potToAddorWithdrawMoneyData?.potTarget as number | undefined}
        potTheme={potTheme?.bg}
      />

      <div className="flex items-center justify-between">
        <p className={`text-preset-5-bold ${potTheme?.text}`}>
          {percentageOfTotalSavedToTarget < 0
            ? "0%"
            : `${percentageOfTotalSavedToTarget.toFixed(2)}%`}
        </p>

        <p className="text-grey-500 text-preset-5">
          Target of ${potToAddorWithdrawMoneyData?.potTarget}
        </p>
      </div>
    </div>
  );
}
