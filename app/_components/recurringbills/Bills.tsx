import BillCard from "@/app/_components/recurringbills/BillCard";
import { getRecurringTransactions } from "@/app/_lib/data-service";

export default async function Bills({
  params,
}: {
  params: { [k: string]: string };
}) {
  const recurringTransactions = await getRecurringTransactions(params);

  let sortedTransactions = recurringTransactions;

  if (params?.sortBy) {
    if (params?.sortBy === "latest") {
      sortedTransactions = recurringTransactions.toSorted(
        (a, b) =>
          Number(new Date(a.date).getDate()) -
          Number(new Date(b.date).getDate()),
      );
    } else if (params?.sortBy === "oldest" && params?.sortBy) {
      sortedTransactions = recurringTransactions.toSorted(
        (a, b) =>
          Number(new Date(b.date).getDate()) -
          Number(new Date(a.date).getDate()),
      );
    } else if (params?.sortBy === "A to Z") {
      sortedTransactions = recurringTransactions.toSorted(
        (a, b) => a?.name?.localeCompare(b?.name as string) as number,
      );
    } else if (params?.sortBy === "Z to A") {
      sortedTransactions = recurringTransactions.toSorted(
        (a, b) => b?.name?.localeCompare(a?.name as string) as number,
      );
    } else if (params?.sortBy === "highest") {
      sortedTransactions = recurringTransactions.toSorted(
        (a, b) => (a?.amount as number) - (b?.amount as number),
      );
    } else if (params?.sortBy === "lowest") {
      sortedTransactions = recurringTransactions.toSorted(
        (a, b) => (b?.amount as number) - (a?.amount as number),
      );
    }
  }

  if (!sortedTransactions?.length) {
    return (
      <h2 className="text-grey-200 mt-8 text-center text-lg font-medium">
        No available transaction for this query :(
      </h2>
    );
  }

  return (
    <ul className="space-y-5">
      {sortedTransactions?.map((transaction, index, arr) => (
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
