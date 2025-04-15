import { getRecurringTransactions } from "@/app/_lib/data-service";
import { RecurringTransactions } from "@/app/_lib/types";
import { Chevron } from "@/app/_ui/NavIcons";
import Link from "next/link";

export default async function RecurringBillsOverview() {
  const recurringTransactions =
    (await getRecurringTransactions()) as RecurringTransactions;

  const paidBills = recurringTransactions?.reduce(
    (acc, curTransaction) =>
      curTransaction.paid ? acc + Math.abs(curTransaction?.amount ?? 0) : acc,
    0,
  );

  const totalUpcoming = recurringTransactions?.reduce(
    (acc, curTransaction) =>
      !curTransaction?.paid ? acc + Math.abs(curTransaction?.amount ?? 0) : acc,
    0,
  );

  const dueSoon = recurringTransactions?.reduce(
    (acc, curTransaction) =>
      !curTransaction?.paid && curTransaction?.dueSoon
        ? acc + Math.abs(curTransaction?.amount ?? 0)
        : acc,
    0,
  );

  return (
    <div className="recurring-bills-overview space-y-8 rounded-xl bg-white px-5 py-6 md:px-8 md:py-8 lg:order-5">
      <header className="flex w-full items-center justify-between">
        <h2 className="text-preset-2 text-grey-900 capitalize">
          recurring bills
        </h2>

        <Link href={"/recurringbills"}>
          <button className="text-preset-4 flex cursor-pointer items-center gap-3">
            <span className="text-grey-500 capitalize">see details</span>
            <Chevron className="text-grey-500 size-3" />
          </button>
        </Link>
      </header>

      <main className="space-y-3">
        {[
          { billType: "paid bills", amount: paidBills, borderBg: "bg-green" },
          {
            billType: "total upcoming",
            amount: totalUpcoming,
            borderBg: "bg-yellow",
          },
          { billType: "Due Soon", amount: dueSoon, borderBg: "bg-cyan" },
        ].map((bill) => (
          <div
            key={bill?.billType}
            className="bg-beige-100 flex overflow-hidden rounded-lg"
          >
            <div className={`${bill?.borderBg} w-1`} />

            <div className="flex flex-grow items-center justify-between px-4 py-5">
              <p className="text-preset-4 text-grey-500 capitalize">
                {bill?.billType}
              </p>
              <p className="text-preset-4-bold text-grey-900">
                ${bill?.amount.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
