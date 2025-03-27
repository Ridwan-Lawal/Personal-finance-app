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
    "lifestyle",
  ],
};

export const CATEGORIES = [
  "entertainment",
  "bills",
  "groceries",
  "dining out",
  "transportation",
  "personal care",
  "lifestyle",
  "education",
];

export const TRANSACTION_PER_PAGE = 10;

export const COLORS = [
  { color: "green", style: "bg-green" },
  { color: "yellow", style: "bg-yellow" },
  { color: "cyan", style: "bg-cyan" },
  { color: "red", style: "bg-red" },
  { color: "purple", style: "bg-purple" },
  { color: "turquoise", style: "bg-turquoise" },
  { color: "brown", style: "bg-brown" },
  { color: "magenta", style: "bg-magenta" },
  { color: "blue", style: "bg-blue" },
  { color: "gold", style: "bg-gold" },
  { color: "orange", style: "bg-orange" },
  { color: "army green", style: "bg-army-green" },
  { color: "navy grey", style: "bg-navy-grey" },
];
