import Menu from "@/app/_components/pots/Menu";
import Overview from "@/app/_components/pots/Overview";

export default function PotCard() {
  return (
    <div className="relative space-y-8 rounded-xl bg-white px-4 py-5 md:px-6">
      {/* Card header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-green size-4 rounded-full" />

          <h2 className="text-preset-2 text-grey-200 capitalize">Savings</h2>
        </div>

        <Menu />
      </div>

      <Overview />

      {/* buttons */}
      <div className="flex items-center gap-4">
        <button className="btn-secondary w-full cursor-pointer justify-center capitalize">
          {" "}
          + add money
        </button>

        <button className="btn-secondary w-full cursor-pointer justify-center capitalize">
          {" "}
          withdraw
        </button>
      </div>
    </div>
  );
}
