"use client";

import {
  onUpdateDeletePotModalOpening,
  onUpdateEditPotModalOpening,
} from "@/app/_lib/redux/potsSlice";
import { AnimatePresence, motion } from "framer-motion";
import { Ellipsis } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function Menu({
  potId,
  potName,
}: {
  potId: string | null;
  potName: string | null;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const onOpenMenu = () => setIsMenuOpen((cur) => !cur);

  function onClickMenuOption(option: string) {
    if (option === "edit") {
      dispatch(onUpdateEditPotModalOpening({ modalOpen: true, potId }));
    } else {
      dispatch(
        onUpdateDeletePotModalOpening({ modalOpen: true, potId, potName }),
      );
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
        <Ellipsis className="text-grey-300 w-3.5" />
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.ul
            className="absolute top-12 right-5 z-30 w-fit rounded-lg  bg-white px-5 py-3 shadow-md shadow-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeIn", duration: 0.1 }}
          >
            {["edit", "delete"].map((option) => (
              <li
                key={option}
                className={`text-preset-4 cursor-pointer capitalize hover:opacity-95 ${option === "edit" ? "text-grey-900 border-grey-100 edit-option mb-3 border-b pb-3" : "text-red delete-option"}`}
                onClick={() => onClickMenuOption(option)}
              >
                {option} pot
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
