import BillCard from "@/app/_components/recurringbills/BillCard";

export default function Bills() {
  return (
    <ul className="space-y-5">
      {Array.from({ length: 4 }, (_, i) => i + 1).map((card, index, arr) => (
        <li key={card} className="space-y-5">
          <BillCard />

          {index !== arr.length - 1 && (
            <div className="border-grey-100 border-b" />
          )}
        </li>
      ))}
    </ul>
  );
}
