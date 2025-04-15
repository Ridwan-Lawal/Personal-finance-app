"use client";

import BudgetCategory from "@/app/_components/budgets/BudgetCategory";
import BudgetColor from "@/app/_components/budgets/BudgetColor";
import BudgetFormInput from "@/app/_components/budgets/BudgetFormInput";
import { useModalBlur } from "@/app/_hooks/useModalBlur";
import { editBudgetAction } from "@/app/_lib/actions/dashboardActions";
import { getBudgets } from "@/app/_lib/data-service-client";
import {
  getBudgetSliceReducer,
  onUpdateEditModalOpening,
} from "@/app/_lib/redux/budgetSlice";
import cancelIcon from "@/public/icon-close-modal.svg";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Suspense, useActionState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function BudgetEditForm() {
  const [state, formAction, isUpdatingBudget] = useActionState(
    editBudgetAction,
    null,
  );

  const { errors, inputs } = state ?? {};

  const { isEditModalOpen, budgetToEdit } = useSelector(getBudgetSliceReducer);
  const dispatch = useDispatch();

  // Getting all budgets
  const { data: budgets } = useQuery({
    queryKey: ["budgets"],
    queryFn: () => getBudgets(),
  });

  // Filtering the budgets to get the budget we want to edit
  const budget = budgets?.filter(
    (budget) =>
      budget?.category?.toLowerCase() ===
      (budgetToEdit as string).toLowerCase(),
  );

  // Effect for closing modal when you click outside it
  const onCloseModal = useCallback(
    () => dispatch(onUpdateEditModalOpening(false)),
    [dispatch],
  );

  useModalBlur(onCloseModal, ".edit-option ", isEditModalOpen);

  // Effect for displaying toast notification when updating budgets
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
      {isEditModalOpen && (
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
              <h2 className="text-preset-1-2 text-grey-900 capitalize">
                Edit budget
              </h2>

              <Image
                src={cancelIcon}
                alt="cancel-icon"
                className="cursor-pointer"
                onClick={() => dispatch(onUpdateEditModalOpening(false))}
              />
            </div>
            <p className="text-preset-4 text-grey-500">
              As your budgets change, feel free to update your spending limits.
            </p>

            {/* form */}
            <form action={formAction} autoComplete="on" className="space-y-4">
              <input type="hidden" name="budgetId" value={budget?.at(0)?.id} />
              <Suspense fallback={<div>Loading...</div>}>
                <BudgetCategory
                  defaultCategoryToEdit={budget?.at(0)?.category}
                  inputDisable={isUpdatingBudget}
                />
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
                  defaultValue={
                    budget?.at(0)?.maxSpending ||
                    (inputs?.maxSpending as number) ||
                    5
                  }
                  disabled={isUpdatingBudget}
                  aria-disabled={isUpdatingBudget}
                  aria-label="maximum spending"
                  aria-live="polite"
                  aria-describedby="maxSpending-error"
                  aria-invalid={!!errors?.maxSpending?.at(0)}
                  className="basic-input"
                  placeholder="e.g 2000"
                  min={5}
                />
              </BudgetFormInput>

              <Suspense fallback={<div>Loading...</div>}>
                <BudgetColor
                  defaultColorToEdit={budget?.at(0)?.colorTag}
                  inputDisable={isUpdatingBudget}
                />
              </Suspense>

              <button
                className="btn btn-primary flex w-full justify-center capitalize"
                disabled={isUpdatingBudget}
                aria-disabled={isUpdatingBudget}
              >
                {isUpdatingBudget ? (
                  <span className="italic">Saving Changes...</span>
                ) : (
                  "Save Changes"
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// create a new branch, and start with the recurring page, or fix the budget page
