"use client";

import {
  getBudgetSliceReducer,
  onUpdateDeleteModalOpening,
} from "@/app/_lib/redux/budgetSlice";
import cancelIcon from "@/public/icon-close-modal.svg";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function DeleteModal() {
  const { isDeleteModalOpen } = useSelector(getBudgetSliceReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    function onBlurModal(e: Event) {
      const target = e.target as HTMLElement;
      if (!target.closest(".form-block") && !target.closest(".delete-option")) {
        dispatch(onUpdateDeleteModalOpening(false));
      }
    }

    window.addEventListener("click", onBlurModal);

    return () => window.removeEventListener("click", onBlurModal);
  }, [dispatch]);

  return (
    <AnimatePresence>
      {isDeleteModalOpen && (
        <motion.div
          className={`form fixed top-0 left-0 z-50 flex h-screen w-full items-center justify-center overflow-hidden bg-black/20 px-6 backdrop-blur-sm`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeIn", duration: 0.2 }}
        >
          {/* Form block */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ ease: "easeIn" }}
            className={`form-block rounde max-w-[560px] space-y-5 rounded-xl bg-white px-5 py-6 shadow-md md:px-8 md:py-8`}
          >
            <div className="flex items-center justify-between">
              <h1 className="text-preset-1-2 text-grey-900">
                Delete &apos;Enterainment&apos;
              </h1>
              <Image
                src={cancelIcon}
                alt="cancel"
                onClick={() => dispatch(onUpdateDeleteModalOpening(false))}
                priority={true}
                className="cursor-pointer"
              />
            </div>
            <p className="text-preset-4 text-grey-500">
              Are you sure you want to delete this budget? This action cannot be
              reversed, and all the data inside it will be removed forever.
            </p>

            <button className="btn-destroy w-full items-center justify-center capitalize">
              yes, confirm deletion
            </button>

            <button
              className="text-grey-500 text-preset-4 hover:text-grey-300 w-full cursor-pointer capitalize transition-all"
              onClick={() => dispatch(onUpdateDeleteModalOpening(false))}
            >
              no, go back
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
