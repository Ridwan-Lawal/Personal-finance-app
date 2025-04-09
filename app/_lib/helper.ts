import { COLORS } from "@/app/_lib/constant";
import { budgets, transactions } from "@/app/_lib/supabase/server";
import { RecurringTransactions } from "@/app/_lib/types";

export function formatDate(date: string) {
  const createdDate = new Date(date);

  return new Intl.DateTimeFormat("en-UK", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(createdDate);
}

export function getColorStyles(color: string | null) {
  if (color) {
    return COLORS?.find(
      (colorObj) => colorObj?.color.toLowerCase() === color?.toLowerCase(),
    )?.style;
  }
}

export function getColorVariable(color: string | null) {
  if (color) {
    return `var(--color-${color?.split(" ")?.join("-")})`;
  }
}

export function totalSpentForEachBudget(
  transactionsForEachCategory: (transactions[] | undefined)[],
  budget: budgets,
) {
  const transactionsWithinMonthForEachCat = transactionsForEachCategory
    ?.map((transaction) =>
      transaction?.filter(
        (transaction) =>
          new Date(transaction?.created_at)?.getMonth() ===
            new Date(Date.now()).getMonth() &&
          (transaction?.amount as number) < 0,
      ),
    )
    .flat(1);

  const totalSpentForEachCategory = transactionsWithinMonthForEachCat
    ?.filter(
      (transaction) =>
        transaction?.category?.toLowerCase() ===
        budget?.category?.toLowerCase(),
    )
    ?.reduce(
      (acc, cur) => (cur?.amount ? acc + Math.abs(cur?.amount) : acc),
      0,
    );

  return totalSpentForEachCategory;
}

export function addDateWithSuffixes(transactionDate: string | null) {
  if (transactionDate) {
    const date = new Date(transactionDate).getDate();

    const lastDigit = date.toString().slice(-1);

    // if the date is from 11th to 20th
    if (date > 10 && date <= 20) {
      return `${date}st`;
    }

    switch (lastDigit) {
      case "1":
        return `${date}st`;
        break;
      case "2":
        return `${date}nd`;
        break;
      case "3":
        return `${date}rd`;
        break;

      default:
        return `${date}th`;
        break;
    }
  }
}

export function getBillLength(
  summaryType: string,
  recurringTransactions: RecurringTransactions,
) {
  switch (summaryType) {
    case "paid-bills":
      return recurringTransactions?.filter((transaction) => transaction?.paid)
        .length;
      break;

    case "total-upcoming":
      return recurringTransactions?.filter((transaction) => !transaction?.paid)
        .length;
      break;

    case "due-soon":
      return recurringTransactions?.filter(
        (transaction) => !transaction?.paid && transaction?.dueSoon,
      ).length;
      break;

    default:
      return 0;
      break;
  }
}

// start building the search and sort functionality
