"use client";

import searchIcon from "@/public/icon-search.svg";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const addFormValueToUrl = useDebouncedCallback(onChangeEvent, 400);

  function onChangeEvent(formValue: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (!formValue) {
      params.delete("search");
    } else {
      params.set("search", formValue);
    }

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

  return (
    <form action="" autoComplete="on">
      <div className="field-container w-[250px] md:w-[320px] lg:w-[260px] xl:w-[320px]">
        <input
          type="text"
          name="search-bills"
          id="search-bills"
          autoComplete="search-bills"
          defaultValue=""
          placeholder="Search bills"
          className="basic-input w-full"
          aria-live="polite"
          aria-label="search bills"
          onChange={(e) => addFormValueToUrl(e.target.value)}
        />
        <Image
          src={searchIcon}
          alt="search-icon"
          priority={true}
          className="cursor-pointer"
        />
      </div>
    </form>
  );
}
