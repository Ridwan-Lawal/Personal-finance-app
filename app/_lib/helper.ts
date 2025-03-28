import { COLORS } from "@/app/_lib/constant";
import { budgets, transactions } from "@/app/_lib/supabase/server";

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
