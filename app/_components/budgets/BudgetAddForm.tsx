"use client";

import BudgetCategory from "@/app/_components/budgets/BudgetCategory";
import BudgetColor from "@/app/_components/budgets/BudgetColor";
import BudgetFormInput from "@/app/_components/budgets/BudgetFormInput";
import {
  getBudgetSliceReducer,
  onUpdateModalOpening,
} from "@/app/_lib/redux/budgetSlice";
import cancelIcon from "@/public/icon-close-modal.svg";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function BudgetAddForm() {
  const { isModalOpen } = useSelector(getBudgetSliceReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    function onBlurModal(e: Event) {
      const target = e.target as HTMLElement;
      if (
        !target.closest(".form-block") &&
        !target.closest(".btn-add-budget")
      ) {
        dispatch(onUpdateModalOpening(false));
      }
    }

    window.addEventListener("click", onBlurModal);

    return () => window.removeEventListener("click", onBlurModal);
  }, [dispatch]);

  return (
    <AnimatePresence>
      {isModalOpen && (
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
            className={`form-block max-w-[560px] space-y-5 rounded-xl bg-white px-5 py-6 shadow-md md:px-8 md:py-8`}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-preset-1-2 text-grey-900 border capitalize">
                add new budget
              </h2>

              <Image
                src={cancelIcon}
                alt="cancel-icon"
                className="cursor-pointer"
                onClick={() => dispatch(onUpdateModalOpening(false))}
              />
            </div>
            <p className="text-preset-4 text-grey-500">
              Choose a category to set a spending budget. Thise categories can
              help you monitor spending.
            </p>

            {/* form */}
            <form action="" autoComplete="on" className="space-y-4">
              <BudgetCategory />
              <BudgetFormInput
                htmlFor="maxSpending"
                label="Maximum Spending"
                error=""
              >
                <p className="text-beige-500 text-preset-4">$</p>
                <input
                  type="text"
                  name="maxSpending"
                  id="maxSpending"
                  autoComplete="maxSpending"
                  defaultValue=""
                  aria-label="maximum spending"
                  aria-live="polite"
                  className="basic-input"
                  placeholder="e.g 2000"
                />
              </BudgetFormInput>
              <BudgetColor />

              <button className="btn btn-primary flex w-full justify-center capitalize">
                add budget
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
