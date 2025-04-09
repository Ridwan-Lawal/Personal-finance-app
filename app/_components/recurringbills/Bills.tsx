import BillCard from "@/app/_components/recurringbills/BillCard";
import { getRecurringTransactions } from "@/app/_lib/data-service";

export default async function Bills() {
  const recurringTransactions = await getRecurringTransactions();

  return (
    <ul className="space-y-5">
      {recurringTransactions?.map((transaction, index, arr) => (
        <li key={transaction?.id} className="space-y-5">
          <BillCard transaction={transaction} />

          {index !== arr.length - 1 && (
            <div className="border-grey-100 border-b" />
          )}
        </li>
      ))}
    </ul>
  );
}
