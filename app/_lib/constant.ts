import filterIcon from "@/public/icon-filter-mobile.svg";
import sortIcon from "@/public/icon-sort-mobile.svg";

export const sort = {
  icon: sortIcon,
  label: "Sort by",
  options: ["latest", "oldest", "A to Z", "Z to A", "highest", "lowest"],
};

export const filter = {
  icon: filterIcon,
  label: "Category",
  options: [
    "all transactions",
    "entertainment",
    "bills",
    "groceries",
    "dining out",
    "transportation",
    "personal care",
  ],
};

export const TRANSACTION_PER_PAGE = 10;
