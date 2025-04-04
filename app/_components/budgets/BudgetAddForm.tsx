"use client";

import BudgetCategory from "@/app/_components/budgets/BudgetCategory";
import BudgetColor from "@/app/_components/budgets/BudgetColor";
import BudgetFormInput from "@/app/_components/budgets/BudgetFormInput";
import { useModalBlur } from "@/app/_hooks/useModalBlur";
import { addBudgetAction } from "@/app/_lib/actions/dashboardActions";
import {
  getBudgetSliceReducer,
  onUpdateModalOpening,
} from "@/app/_lib/redux/budgetSlice";
import cancelIcon from "@/public/icon-close-modal.svg";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Suspense, useActionState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function BudgetAddForm() {
  const [state, formAction, isAddingBudget] = useActionState(
    addBudgetAction,
    null,
  );

  const { errors, inputs } = state ?? {};

  const { isModalOpen } = useSelector(getBudgetSliceReducer);
  const dispatch = useDispatch();

  const onCloseModal = useCallback(
    () => dispatch(onUpdateModalOpening(false)),
    [dispatch],
  );

  useModalBlur(onCloseModal, ".btn-add-budget", isModalOpen);

  useEffect(() => {
    if (state) {
      if (state?.success) {
        toast.success(state?.message);
        onCloseModal();
      } else if (state?.success === false) {
        toast.error(state?.message);
      }
    }
  }, [state, onCloseModal]);

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className={`form fixed top-0 left-0 z-50 flex h-screen w-full items-center justify-center overflow-hidden bg-black/20 px-6 backdrop-blur-[2px]`}
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
            <form action={formAction} autoComplete="on" className="space-y-4">
              <Suspense fallback={<div>Loading...</div>}>
                <BudgetCategory inputDisable={isAddingBudget} />
              </Suspense>
              <BudgetFormInput
                htmlFor="maxSpending"
                label="Maximum Spending"
                error={errors?.maxSpending?.at(0)}
              >
                <p className="text-beige-500 text-preset-4">$</p>
                <input
                  type="number"
                  name="maxSpending"
                  id="maxSpending"
                  autoComplete="maxSpending"
                  defaultValue={(inputs?.maxSpending as number) ?? 5}
                  aria-label="maximum spending"
                  aria-live="polite"
                  className="basic-input"
                  placeholder="e.g 2000"
                  disabled={isAddingBudget}
                  aria-disabled={isAddingBudget}
                  aria-describedby="maxSpending-error"
                  aria-invalid={!!errors?.maxSpending}
                  min={5}
                />
              </BudgetFormInput>

              <Suspense fallback={<div>Loading...</div>}>
                <BudgetColor inputDisable={isAddingBudget} />
              </Suspense>

              <button
                className="btn btn-primary flex w-full justify-center capitalize disabled:opacity-80"
                disabled={isAddingBudget}
              >
                {isAddingBudget ? (
                  <span className="italic">Adding Budget...</span>
                ) : (
                  "add budget"
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
