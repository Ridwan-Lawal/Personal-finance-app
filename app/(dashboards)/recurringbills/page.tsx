import Bills from "@/app/_components/recurringbills/Bills";
import Heading from "@/app/_components/recurringbills/Heading";
import Overview from "@/app/_components/recurringbills/Overview";
import SearchForm from "@/app/_components/recurringbills/SearchForm";
import Sortbar from "@/app/_components/recurringbills/Sortbar";
import { Metadata } from "@/app/_lib/metadata";

export const metadata: Metadata = {
  title: "Recurring bills",
};

export default function Page() {
  return (
    <div className="space-y-8 px-4 py-6 md:px-10 md:py-8">
      <h1 className="text-preset-1 text-grey-900 capitalize">
        recurring bills
      </h1>
      <div className="flex flex-col gap-6 lg:flex-row">
        <Overview />

        {/* recurring bills */}
        <div className="space-y-6 rounded-[12px] bg-white px-5 py-6 md:px-8 md:py-8 lg:w-[64%]">
          {/* form and sort */}
          <div className="flex items-center justify-between gap-3">
            <SearchForm />
            <Sortbar />
          </div>

          <Heading />
          <Bills />
        </div>
      </div>
    </div>
  );
}
