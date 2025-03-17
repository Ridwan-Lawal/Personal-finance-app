"use client";

import searchIcon from "@/public/icon-search.svg";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function TransactionSearch() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const onSearchTransactionDebounce = useDebouncedCallback(
    (searchValue) => onSearchTransaction(searchValue),
    700,
  );

  function onSearchTransaction(prompt: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (!prompt) params.delete("search");
    params.set("search", prompt);

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function onSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
  }

  return (
    <form
      action=""
      autoComplete="on"
      className="border-beige-500 flex items-center gap-4 rounded-[8px] border px-5 py-3 lg:w-[320px]"
      onSubmit={onSubmit}
    >
      <input
        type="text"
        name="search"
        id="search"
        defaultValue=""
        autoComplete="search-transaction"
        placeholder="Search transaction"
        aria-live="polite"
        aria-label="search transaction"
        className="basic-input text-preset-4 flex-grow focus:outline-none"
        onChange={(e) => onSearchTransactionDebounce(e.target.value)}
      />
      <Image src={searchIcon} alt="search icon" />
    </form>
  );
}
