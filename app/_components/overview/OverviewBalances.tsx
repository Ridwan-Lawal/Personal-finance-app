import { getBalances } from "@/app/_lib/data-service";

export default async function OverviewBalances() {
  const balances = await getBalances();

  const { current, expenses, income } = balances?.at(0) ?? {};

  console.log(balances, "balances");

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
      {[
        {
          balanceType: "current balance",
          amount: `$${(current ?? 0)?.toFixed(2)}`,
          bg: "black",
        },
        { balanceType: "Income", amount: `$${(income ?? 0)?.toFixed(2)}` },
        { balanceType: "expenses", amount: `$${(expenses ?? 0)?.toFixed(2)}` },
      ]?.map((balance) => (
        <div
          key={balance?.balanceType}
          className={`${balance?.bg ? "bg-grey-900 text-white" : "text-grey-900 bg-white"} w-full space-y-3 rounded-xl p-5 shadow-md shadow-gray-200 md:p-6`}
        >
          <p className="text-preset-4 text-inherit capitalize">
            {balance?.balanceType}
          </p>
          <h1 className="text-preset-1 text-inherit">{balance?.amount}</h1>
        </div>
      ))}
    </div>
  );
}
