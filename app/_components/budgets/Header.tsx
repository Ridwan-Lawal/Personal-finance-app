"use client";

import { onUpdateModalOpening } from "@/app/_lib/redux/budgetSlice";
import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";

export default function Header() {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-preset-1 text-grey-900 capitalize">budgets </h1>

      <button
        onClick={() => dispatch(onUpdateModalOpening(true))}
        className="btn-primary btn-add-budget gap-1 capitalize"
      >
        <Plus className="size-4 text-white" />
        <span>add new budget</span>
      </button>
    </div>
  );
}
