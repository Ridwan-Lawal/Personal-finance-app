import searchIcon from "@/public/icon-search.svg";
import Image from "next/image";

export default function SearchForm() {
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
