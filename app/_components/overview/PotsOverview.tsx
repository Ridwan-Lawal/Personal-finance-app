import { getPots } from "@/app/_lib/data-service";
import { getColorStyles } from "@/app/_lib/helper";
import { Chevron } from "@/app/_ui/NavIcons";
import potIcon from "@/public/icon-pot.svg";
import Image from "next/image";
import Link from "next/link";

export default async function PotsOverview() {
  const pots = await getPots();

  const totalSaved = pots?.reduce(
    (acc, curPot) =>
      curPot?.potCurrentBalance ? acc + curPot?.potCurrentBalance : acc,
    0,
  );

  return (
    <div className="pots-overview space-y-5 rounded-xl border bg-white px-5 py-6 drop-shadow-sm md:px-8">
      {/* header */}
      <header className="flex items-center justify-between">
        <h2 className="text-preset-2 text-grey-900 capitalize">pots</h2>

        <Link href="/pots">
          <button className="text-preset-4 flex cursor-pointer items-center gap-3">
            <span className="text-grey-500 capitalize">see details</span>
            <Chevron className="text-grey-500 size-3" />
          </button>
        </Link>
      </header>

      <div className={`flex flex-col gap-5 ${pots?.length && "md:flex-row"}`}>
        <main className="bg-beige-100 flex gap-4 rounded-xl p-4 md:w-full">
          <Image src={potIcon} alt="pot" quality={100} priority={true} />

          <div className="space-y-[11px]">
            <p className="text-preset-4 text-grey-500 capitalize">
              total saved
            </p>
            <h1 className="text-preset-1 text-grey-900">${totalSaved}</h1>
          </div>
        </main>

        <footer className="grid grid-cols-2 gap-4 md:w-full">
          {pots?.slice(0, 4)?.map((pot) => (
            <div className="flex items-start gap-4" key={pot?.id}>
              <div
                className={`w-1 ${getColorStyles(pot?.potTheme)} h-[43px]`}
              />

              <div className="space-y-1">
                <p className="text-preset-5 text-grey-500">{pot?.potName}</p>
                <h2 className="text-preset-2 text-grey-900">
                  ${pot?.potCurrentBalance}
                </h2>
              </div>
            </div>
          ))}
        </footer>
      </div>
    </div>
  );
}
