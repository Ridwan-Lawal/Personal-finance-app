import chevronLeftIcon from "@/public/icon-caret-left.svg";
import Image from "next/image";

export default function TransactionsPagination() {
  return (
    <div className="mt-11 flex items-center justify-between">
      <button className="btn text-preset-4 btn-pagination">
        <Image src={chevronLeftIcon} alt="arrow" priority={true} />

        <span>Prev</span>
      </button>

      <div className="flex items-center gap-2">
        {Array.from({ length: 5 }, (_, i) => i + 1).map((page) => (
          <button
            className="btn text-preset-4 btn-pagination size-10 justify-center"
            key={page}
          >
            {page}
          </button>
        ))}
      </div>

      <button className="btn text-preset-4 btn-pagination">
        <Image src={chevronLeftIcon} alt="arrow" priority={true} />

        <span>Next</span>
      </button>
    </div>
  );
}
