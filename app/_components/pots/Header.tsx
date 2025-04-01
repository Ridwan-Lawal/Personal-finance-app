"use client";

import { onUpdateAddPotModalOpening } from "@/app/_lib/redux/potsSlice";
import { useDispatch } from "react-redux";

export default function Header() {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-preset-1 text-grey-900 capitalize">pots</h1>

      <button
        className="btn-primary btn-add-pot capitalize"
        onClick={() => dispatch(onUpdateAddPotModalOpening(true))}
      >
        + add new pot
      </button>
    </div>
  );
}
