"use client";

import {
  onUpdateBudgetToDelete,
  onUpdateBudgetToEdit,
  onUpdateDeleteModalOpening,
  onUpdateEditModalOpening,
} from "@/app/_lib/redux/budgetSlice";
import { Ellipsis } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function Menu({
  budgetCategory,
  budgetId,
}: {
  budgetCategory: string | null;
  budgetId: string | null;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const onOpenMenu = () => setIsMenuOpen((cur) => !cur);

  function onClickMenuOption(option: string) {
    if (option === "edit") {
      dispatch(onUpdateEditModalOpening(true));
      dispatch(onUpdateBudgetToEdit(budgetCategory));
    } else {
      dispatch(onUpdateDeleteModalOpening(true));
      dispatch(onUpdateBudgetToDelete({ budgetId, budgetCategory }));
    }
  }

  useEffect(() => {
    function onBlurMenuOption(e: Event) {
      const target = e.target as HTMLElement;

      if (!target.closest(".menu")) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("click", onBlurMenuOption);

    return () => document.removeEventListener("click", onBlurMenuOption);
  }, []);

  return (
    <div className="menu space-y-2">
      <button onClick={onOpenMenu} className="cursor-pointer">
        <Ellipsis className="text-grey-300 size-3.5" />
      </button>

      {isMenuOpen && (
        <ul className="absolute top-12 right-5 z-30 w-fit rounded-lg border bg-white px-5 py-3 shadow-md shadow-gray-200">
          {["edit", "delete"].map((option) => (
            <li
              key={option}
              className={`text-preset-4 cursor-pointer capitalize hover:opacity-95 ${option === "edit" ? "text-grey-900 border-grey-100 edit-option mb-3 border-b pb-3" : "text-red delete-option"}`}
              onClick={() => onClickMenuOption(option)}
            >
              {option} budget
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
