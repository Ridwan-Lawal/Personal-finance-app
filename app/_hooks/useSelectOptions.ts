import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
} from "next/navigation";
import { useOptimistic, useTransition } from "react";

export function useSelectOptions(
  optionSelected: string,
  searchParams: ReadonlyURLSearchParams,
  optionLabel: string,
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();

  // Optimistic for option selection
  const [optimisticOption, addOptimisticOption] = useOptimistic(
    { optionSelected },
    (curOption, newOption: string) => {
      return { ...curOption, optionSelected: newOption };
    },
  );

  // Adding category and sort by option to the url
  function onSelectOption(option: string) {
    // Add optimistic option
    startTransition(() => addOptimisticOption(option));

    // Add option to the url
    const params = new URLSearchParams(searchParams.toString());
    params.set(optionLabel, option);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return { onSelectOption, optimisticOption };
}
