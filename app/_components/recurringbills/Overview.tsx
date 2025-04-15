import { getRecurringTransactions } from "@/app/_lib/data-service";
import { getBillLength } from "@/app/_lib/helper";
import { RecurringTransactions } from "@/app/_lib/types";
import bilIcon from "@/public/icon-recurring-bills.svg";
import Image from "next/image";

export default async function Overview() {
  const recurringTransactions =
    (await getRecurringTransactions()) as RecurringTransactions;

  const totalBills = recurringTransactions?.reduce(
    (acc, curTransaction) => acc + Math.abs(curTransaction?.amount ?? 0),
    0,
  );

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
    <div className="flex-l flex flex-col gap-3 md:w-full md:flex-6 md:flex-row lg:w-[36%] lg:flex-col">
      {/* total bills */}
      <div className="total-bills md:w-[50%] lg:w-full">
        <Image src={bilIcon} alt="bill-icon" quality={100} priority={true} />

        <div className="space-y-[11px]">
          <p className="text-preset-4 text-white">Total bills</p>
          <h2 className="text-preset-1 text-white">${totalBills.toFixed(2)}</h2>
        </div>
      </div>

      {/* summary */}
      <div className="space-y-5 rounded-xl bg-white p-5 md:w-[50%] lg:w-full">
        <p className="text-preset-3 text-grey-900 capitalize">summary</p>

        <ul className="space-y-4">
          {[
            {
              type: "paid bills",
              price: `${getBillLength("paid-bills", recurringTransactions)} ($${paidBills.toFixed(2)})`,
            },
            {
              type: "total upcoming",
              price: `${getBillLength("total-upcoming", recurringTransactions)} ($${totalUpcoming.toFixed(2)})`,
            },
            {
              type: "due soon",
              price: `${getBillLength("due-soon", recurringTransactions)} ($${dueSoon.toFixed(2)})`,
            },
          ].map((bill, billIndex, arr) => (
            <li key={billIndex} className="space-y-4">
              <span className="flex items-center justify-between">
                <span
                  className={`${bill?.type?.includes("due") ? "text-red" : "text-grey-500"} text-preset-5 capitalize`}
                >
                  {bill?.type}
                </span>

                <span
                  className={`text-preset-5-bold ${bill?.type?.includes("due") && "text-red"}`}
                >
                  {bill?.price}
                </span>
              </span>

              {billIndex !== arr.length - 1 && (
                <div className="border-grey-100 border-b" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Start working on the functionality of the recurring bills page, you can start from getting the recurring bills from the DB
