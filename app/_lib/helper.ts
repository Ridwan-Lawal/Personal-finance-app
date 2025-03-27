import { COLORS } from "@/app/_lib/constant";

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
