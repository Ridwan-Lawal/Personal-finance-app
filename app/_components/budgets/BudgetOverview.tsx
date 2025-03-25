import { Progress } from "@/components/ui/progress";

export default function BudgetOverview() {
  return (
    <div className="space-y-4 border">
      <p className="text-preset-4 text-grey-500">Maximum of $50.00</p>

      {/* progress bar */}
      <Progress value={30} indicatorClassName="bg-green" />

      {/* spent and free */}

      <div className="flex items-center gap-4">
        {/* spent */}
        <div className="border-green flex w-1/2 flex-col gap-1 border-l-4 px-4">
          <p className="text-preset-5 text-grey-500">Spent</p>

          <p className="text-preset-4-bold text-grey-900">$250</p>
        </div>

        {/* free */}
        <div className="border-beige-100 flex w-1/2 flex-col gap-1 border-l-4 px-4">
          <p className="text-preset-5 text-grey-500">Spent</p>

          <p className="text-preset-4-bold text-grey-900">$250</p>
        </div>
      </div>
    </div>
  );
}
