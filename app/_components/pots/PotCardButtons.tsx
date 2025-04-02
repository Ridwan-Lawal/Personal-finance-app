"use client";

import { onUpdateAddMoneyModalOpening } from "@/app/_lib/redux/potsSlice";
import { useDispatch } from "react-redux";

type ButtonsProps = {
  potId: string | null;
  potName: string | null;
};

export default function PotCardButtons({ potId, potName }: ButtonsProps) {
  const dispatch = useDispatch();

  function onAddMoney() {
    if (potId && potName) {
      dispatch(
        onUpdateAddMoneyModalOpening({ modalOpen: true, potId, potName }),
      );
    }
  }

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={onAddMoney}
        className="btn-secondary add-money-btn w-full cursor-pointer justify-center capitalize"
      >
        {" "}
        + add money
      </button>

      <button className="btn-secondary w-full cursor-pointer justify-center capitalize">
        {" "}
        withdraw
      </button>
    </div>
  );
}
