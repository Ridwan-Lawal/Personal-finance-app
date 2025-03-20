"use client";

import chevronLeftIcon from "@/public/icon-caret-left.svg";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TransactionsPagination({
  totalTransactionsFromDB,
}: {
  totalTransactionsFromDB: number | null;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentPageNo = searchParams.get("page") ?? 1;
  const [pageNo, setPageNo] = useState(+currentPageNo);

  const totalPageNumbers = totalTransactionsFromDB
    ? Math.ceil(totalTransactionsFromDB / 10)
    : 0;

  const onNextPage = () =>
    setPageNo((cur) => (pageNo < totalPageNumbers ? cur + 1 : cur));

  const onPrevPage = () => setPageNo((cur) => (pageNo > 1 ? cur - 1 : cur));

  const onClickPageNo = (page: number) => setPageNo(page);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(pageNo));

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pageNo, router, pathname, searchParams]);

  return (
    <div className="mt-11 flex items-center justify-between gap-4">
      <button
        onClick={onPrevPage}
        className="btn text-preset-4 btn-pagination disabled:text-grey-300 disabled:border-grey-300 disabled:hover:text-grey-300 disabled:hover:bg-none"
        disabled={pageNo === 1}
      >
        <Image src={chevronLeftIcon} alt="arrow" priority={true} />

        <span className="hidden sm:block">Prev</span>
      </button>

      <div className="flex flex-wrap items-center gap-2">
        {Array.from(
          { length: totalPageNumbers > 5 ? 5 : totalPageNumbers },
          (_, i) => i + 1,
        ).map((page) => (
          <button
            className={`btn text-preset-4 btn-pagination hidden size-10 items-center justify-center sm:flex ${pageNo === page && "btn-page-active"} `}
            key={page}
            onClick={() => onClickPageNo(page)}
          >
            {page}
          </button>
        ))}

        <button className="btn text-preset-4 btn-pagination btn-page-active size-10 justify-center sm:hidden">
          {pageNo}
        </button>
      </div>

      <button
        className="btn text-preset-4 btn-pagination disabled:text-grey-300 disabled:border-grey-300 disabled:hover:text-grey-300 disabled:hover:bg-none"
        onClick={onNextPage}
        disabled={pageNo === totalPageNumbers}
      >
        <span className="hidden sm:block">Next</span>
        <Image
          src={chevronLeftIcon}
          alt="arrow"
          priority={true}
          className="rotate-180"
        />
      </button>
    </div>
  );
}

// Create a new branch and work on a new feature
// there's a bug concerning fetching data, create a new branch
